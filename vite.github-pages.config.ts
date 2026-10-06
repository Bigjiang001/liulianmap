import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
export default defineConfig({root:root+'pages',base:'/liulianmap/',publicDir:root+'public',plugins:[react()],resolve:{alias:{'@':root}},build:{outDir:root+'docs',emptyOutDir:true,target:'es2022'}});
