import {database} from '@/db';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {allPlaces,bad,fail} from '@/lib/store';
export async function GET(request:Request){try{
 const q=new URL(request.url).searchParams,placeId=q.get('place')||'',offset=Number(q.get('offset')||0);
 if(!Number.isInteger(offset)||offset<0||offset>10000)return bad('分页参数不正确。');
 if(!(await allPlaces()).some(p=>p.id===placeId))return bad('地点不存在。');
 const db=database(),user=await getChatGPTUser(),term=(q.get('query')||'').trim().slice(0,100),photos=q.get('photos')==='1';
 const rating=Number(q.get('rating')||0);
 if(!Number.isInteger(rating)||rating<0||rating>5)return bad('星级参数不正确。');
 const orders:Record<string,string>={helpful:'helpful DESC,p.created_at DESC,p.id DESC',highest:'p.rating DESC,p.created_at DESC,p.id DESC',lowest:'p.rating ASC,p.created_at DESC,p.id DESC'};
 const order=Object.prototype.hasOwnProperty.call(orders,q.get('sort')||'')?orders[q.get('sort')!]:'p.created_at DESC,p.id DESC';
 const result=await db.prepare(`SELECT p.*,u.name AS author,u.bio AS author_bio,(SELECT COUNT(*) FROM likes l WHERE l.post_id=p.id) AS helpful FROM posts p JOIN profiles u ON u.id=p.user_id WHERE p.status='active' AND p.place_id=? AND (?='' OR p.content LIKE ? OR p.variety LIKE ?) AND (?=0 OR p.photos!='[]') AND (?=0 OR p.rating=?) ORDER BY ${order} LIMIT 21 OFFSET ?`).bind(placeId,term,'%'+term+'%','%'+term+'%',photos?1:0,rating,rating,offset).all();
 const posts:Record<string,unknown>[] =result.results.slice(0,20).map(p=>({...p,photos:JSON.parse(String(p.photos))})),ids=posts.map(p=>p.id),placeholders=ids.map(()=>'?').join(',');
 const comments=ids.length?await db.prepare(`SELECT c.*,u.name AS author FROM comments c JOIN profiles u ON u.id=c.user_id WHERE c.post_id IN (${placeholders}) ORDER BY c.created_at ASC LIMIT 1000`).bind(...ids).all():{results:[]};
 const myLikes=user&&ids.length?await db.prepare(`SELECT post_id FROM likes WHERE user_id=? AND post_id IN (${placeholders})`).bind(user.userId,...ids).all():{results:[]};
 return Response.json({posts,comments:comments.results,likes:posts.map(p=>({post_id:p.id,count:p.helpful})),myLikes:myLikes.results,nextOffset:result.results.length>20?offset+20:null},{headers:{'Cache-Control':'no-store'}});
}catch(e){return fail(e);}}
