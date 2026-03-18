
```jsx
import { cn } from "@/lib/utils";

export default function ScoreGauge({
  score = 0, size = 200, strokeWidth = 14,
  color = "#a855f7", label = "Score", className,
}) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(score, 0), 100);
  const offset = circ - (pct / 100) * circ;
  const c = size / 2;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={c} cy={c} r={r} fill="none"
            stroke="hsl(216 34% 13%)" strokeWidth={strokeWidth} />
          <circle cx={c} cy={c} r={r} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.2s ease-in-out",
              filter: `drop-shadow(0 0 10px ${color}70)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold tabular-nums" style={{ color }}>
            {pct}%
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2 font-medium">{label}</p>
    </div>
  );
}
```
