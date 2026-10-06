import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'榴莲地图 · 曼谷',description:'在曼谷寻找榴莲，记录每一口的味道。真实地点线索、导航与吃货分享。',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,statusBarStyle:'default',title:'榴莲地图'},icons:{icon:'/favicon.svg',apple:'/apple-touch-icon.png'}};
export const viewport: Viewport = {width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#f8c934'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
