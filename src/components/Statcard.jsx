
import { cn } from "@/lib/utils";

export default function StatCard({ icon: Icon, label, value, accent = "violet" }) {

const accents = {

violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20",

amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20",

emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",

rose: "from-rose-500/20 to-rose-600/5 border-rose-500/20",

};

return (

<div className={cn(

"rounded-2x1 border bg-gradient-to-br p-5 transition-all hover:scale-[1.02]",

accents [accent]

)}>

<div className="flex items-center gap-3 mb-3">

<Icon className="w-4 h-4 text-slate-400" />

<span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>

</div>

<p className="text-2x1 font-bold">{value}</p>

</div>

);
}
