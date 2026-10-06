import {bucket,database} from '@/db';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){try{
 const {id}=await params;if(!/^[a-f0-9-]{36}$/.test(id))return new Response('Not found',{status:404});
 const published=await database().prepare("SELECT p.id FROM posts p,json_each(p.photos) photo WHERE p.status='active' AND photo.value=? LIMIT 1").bind(id).first();
 if(!published){const user=await getChatGPTUser();if(!user||!await database().prepare('SELECT id FROM uploads WHERE id=? AND user_id=?').bind(id,user.userId).first())return new Response('Not found',{status:404});}
 const object=await bucket().get(id);if(!object)return new Response('Not found',{status:404});return new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'image/jpeg','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}catch(e){console.error(e);return new Response('Unavailable',{status:503});}}
