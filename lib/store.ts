import {database} from '@/db';
import {env} from 'cloudflare:workers';
import {seedPlaces,type Place} from './places';
import type {ChatGPTUser} from '@/app/chatgpt-auth';
export async function initUser(user:ChatGPTUser){const db=database();const name='榴莲吃货 '+crypto.randomUUID().slice(0,4);await db.batch([db.prepare('INSERT OR IGNORE INTO profiles (id,name,bio,created_at) VALUES (?,?,?,?)').bind(user.userId,name,'',Date.now())]);}
export async function isAdmin(id:string){const configured=(env as unknown as {ADMIN_USER_ID?:string}).ADMIN_USER_ID;if(configured)return id===configured;const row=await database().prepare('SELECT value FROM settings WHERE key=?').bind('owner').first<{value:string}>();return row?.value===id;}
export async function allPlaces(){const rows=await database().prepare("SELECT id,payload FROM submissions WHERE status='approved' ORDER BY created_at ASC").all<{id:string;payload:string}>();let places=[...seedPlaces];for(const row of rows.results){const proposal=JSON.parse(row.payload) as {kind:string;placeId?:string;place:Place};if(proposal.kind==='correction'){places=places.map(p=>p.id===proposal.placeId?{...p,...proposal.place,id:p.id}:p);}else places.push({...proposal.place,id:row.id});}return places;}
export function fail(error:unknown){console.error('Durian map storage:',error);return Response.json({error:'暂时无法保存或读取，请稍后重试。你的输入会保留。'},{status:503});}
export function bad(message:string){return Response.json({error:message},{status:400});}
export function safeText(value:unknown,max:number){return typeof value==='string'?value.trim().slice(0,max):'';}
export function validOrigin(request:Request){const origin=request.headers.get('origin');return !!origin&&origin===new URL(request.url).origin;}

// Atomic per-user fixed-window budget. Authentication is supplied by the hosting gateway.
export async function allowWrite(userId:string,scope:string,limit:number){
 const now=Date.now(),window=Math.floor(now/60000),key=scope+':'+userId+':'+window;
 const row=await database().prepare('INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,(window+2)*60000).first<{count:number}>();
 await database().prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(now).run();
 return !!row&&row.count<=limit;
}
export function tooMany(){return Response.json({error:'操作有些频繁，请一分钟后再试。你的输入会保留。'},{status:429,headers:{'Retry-After':'60'}});}
