/** External material is editorial context, never a native review or rating. */
export type PublicExperience={id:string;placeId:string;title:string;author:string;platform:string;date:string;summary:string;url:string};
export const publicExperiences:PublicExperience[]=[
 {id:'tatoy-2016',placeId:'tatoy',title:'一次尝三种，才知道自己喜欢哪一口',author:'Lindsay Gasik',platform:'Year of the Durian · 亲历试吃',date:'2016-03-25',summary:'作者在 Ta-Toy 与家人试吃不同品种：长柄浓稠，Nockachip 偏水，成熟的 Puangmanee 风味更圆润。品种之间的差异，是这次试吃的重点。',url:'https://www.yearofthedurian.com/2016/03/buy-durian-in-bangkok-or-tor-kor-market.html'},
 {id:'jaepha-2021',placeId:'jaepha',title:'软硬适中的果肉，甜而浓郁',author:"Gresy’ Loaf",platform:'Wongnai · 用户购买体验',date:'2021-06-04',summary:'这位购买者称果肉软硬适中、甜而浓郁，并提到可以向店家说明自己想要的成熟度。此记录来自外送／预订取货体验。',url:'https://www.wongnai.com/restaurants/630118rS-ทุเรียนเจ้ภา-เยาวราช-ปากซอย6-ตอกเล่งบ๊วยเอี้ย'},
 {id:'asiatique-2026',placeId:'durianism-asiatique',title:'河畔散步后的榴莲冰沙',author:'Shammi Kolonne',platform:'Medium · 旅行亲历',date:'2026-03-22',summary:'作者在 Asiatique 游逛时尝了 Durianism Café 的榴莲冰沙和芒果冰品，记录了自己很喜欢这次甜品体验。发布日期不等于到店日期。',url:'https://shammi0107.medium.com/pages-from-our-bangkok-diaries-887226049648'}
];
export const shopVideos=[
 {placeId:'ortorkor',id:'7VuMqtUIrE0',title:'走进 Or Tor Kor，看看榴莲摊位',author:'Richie on the way',date:'2025-05-04',kind:'实地探访'},
 {placeId:'naiyut',id:'22b9G5esW_U',title:'Nai Yut 榴莲店现场报道',author:'TNN',date:'2019-05-17',kind:'媒体报道'},
 {placeId:'goldfinger',id:'j67SzDYIcOw',title:'唐人街 Gold Finger 店铺与榴莲',author:'Durian Yaowaraj',date:'2013-01-01',kind:'商家公开视频'}
];
export const marketPhoto={src:'/liulianmap/ortorkor-susan-slater.jpg',author:'Susan Slater',date:'2009-12-21',source:'https://commons.wikimedia.org/wiki/File:Durian_(Durio_zibethinus).jpg',license:'https://creativecommons.org/licenses/by-sa/4.0/'};
export const tastingGuides=[
 {title:'多品种，慢慢试',subtitle:'想找到自己的口感偏好',icon:'01',placeIds:['ortorkor','tatoy'],reason:'市场与 Ta-Toy 的公开探店记录提到多种榴莲。先问当日品种和能否试吃，再决定。'},
 {title:'唐人街，边走边吃',subtitle:'按街区找鲜果与糯米饭',icon:'02',placeIds:['goldfinger','jaepha'],reason:'两家都收录在 Yaowarat 街区，分别有公开视频或购买者记录；具体摊位请核对招牌。'},
 {title:'换一口，吃甜品',subtitle:'从榴莲冰沙开始',icon:'03',placeIds:['durianism-asiatique'],reason:'2026 年发布的旅行记录提到这家的榴莲冰沙；适合想先尝榴莲甜品的人。'}
];
