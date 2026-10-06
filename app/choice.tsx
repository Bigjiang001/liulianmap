'use client';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
export function Choice({value,onChange,options,label,labels}:{value:string;onChange:(s:string)=>void;options:string[];label:string;labels?:Record<string,string>}){return <Select value={value} onValueChange={onChange}><SelectTrigger className="form-select" aria-label={label}><SelectValue placeholder={label}/></SelectTrigger><SelectContent>{options.map(x=><SelectItem key={x} value={x}>{labels?.[x]||x}</SelectItem>)}</SelectContent></Select>}
