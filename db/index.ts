import {env} from 'cloudflare:workers';
export function database(){if(!env.DB)throw new Error('DB unavailable');return env.DB;}
export function bucket(){if(!env.BUCKET)throw new Error('BUCKET unavailable');return env.BUCKET;}
