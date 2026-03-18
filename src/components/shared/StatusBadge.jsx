
```jsx
import { cn } from "@/lib/utils";
import { Zap, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";

const CONFIG = {
  "Under-Researched": { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: TrendingUp },
  "Adequately Researched": { color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", icon: CheckCircle },
  "Well-Researched": { color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", icon: CheckCircle },
  "Over-Researched": { color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", icon: Zap },
  "Low Friction": { color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", icon: CheckCircle },
  "Moderate Friction": { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", icon: AlertTriangle },
  "High Friction": { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: AlertTriangle },
  "Critical Friction": { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: AlertTriangle },
};

export default function StatusBadge({ status, className }) {
  const cfg = CONFIG[status] || { color: "text-muted-foreground", bg: "bg-muted/10 border-muted/20", icon: Zap };
  const Icon = cfg.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border", cfg.bg, cfg.color, className)}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}
```
