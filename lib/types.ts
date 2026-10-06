import type {Place} from './places';
import type {PlaceStats} from './ratings';
export type Post={id:string;user_id:string;place_id:string;rating:number;content:string;visit_date:string;variety:string;texture:string;sweetness:string;aroma:string;price:number|null;weight:number|null;basis:string;photos:string[];created_at:number;author:string;author_bio:string};
export type Comment={id:string;post_id:string;user_id:string;content:string;author:string;created_at:number};
export type Submission={id:string;status:string;created_at:number;payload:{kind:string;placeId?:string;place:Place}};
export type AppData={stats:PlaceStats[];places:Place[];posts:Post[];comments:Comment[];likes:{post_id:string;count:number}[];myLikes:{post_id:string}[];favorites:{place_id:string}[];user:{id:string;name:string;bio:string;admin:boolean}|null;submissions:Submission[];reports:{id:string;target:string;reason:string;status:string}[]};
export async function api<T>(path:string,options?:RequestInit):Promise<T>{const response=await fetch(path,options);const result=await response.json();if(!response.ok)throw new Error((result as {error?:string}).error||'操作失败，请稍后重试。');return result as T;}
export function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
