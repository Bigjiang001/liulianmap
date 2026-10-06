import type {PostCard} from './posts';
export function ReviewFeed(_props:{placeId:string;postProps:Omit<React.ComponentProps<typeof PostCard>,'post'>}){return <div className="small-empty">本站照片上传、星级评分与社区评论尚未开放。可查看下方公开探店感受，或打开 Google 地图阅读原平台评价。</div>;}
