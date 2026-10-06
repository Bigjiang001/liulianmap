export const browseOnly = true;
export const asset = (path:string) => '/liulianmap/'+path.replace(/^\//,'');
export const savedPlaces = () => {try{return JSON.parse(localStorage.getItem('durian-map:saved:v1')||'[]') as string[];}catch{return [];}};
