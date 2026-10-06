export type PlaceStats={place_id:string;count:number;rating:number;reviewers:number;rank_rating:number;last:string;s1:number;s2:number;s3:number;s4:number;s5:number};
export function rankingScore(s:PlaceStats){return s.reviewers>=3?(s.rank_rating*s.reviewers+10.5)/(s.reviewers+3):0;}
