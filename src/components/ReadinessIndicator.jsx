
import { cn } from "@/lib/utils";

import { CheckCircle, AlertTriangle, XCircle, Zap } from "lucide-react";

const statuses = {

};

not_ready: { label: "Not Ready", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },

almost_ready: { label: "Almost Ready", icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },

ready: { label: "Ready to Decide", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },

over_researched: { label: "Over-Researched", icon: Zap, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },

export default function ReadinessIndicator({ status }) {

}

const config = statuses [status] || statuses.not_ready;

const Icon = config.icon;

return (

);

<div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium", config.bg, config.color)}>

<Icon className="w-4 h-4" />

{config.label}

</div>
