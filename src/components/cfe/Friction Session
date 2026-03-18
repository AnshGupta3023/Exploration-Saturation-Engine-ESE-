
```jsx
import { formatDate, getFrictionColor, getFrictionStatus } from "@/lib/utils"
import { Zap, Clock, Activity, AlertTriangle } from "lucide-react"
import StatusBadge from "@/components/shared/StatusBadge"

export default function FrictionSession({ session }) {
  if (!session) return null
  const color = getFrictionColor(session.frictionScore)
  const status = getFrictionStatus(session.frictionScore)

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground">{session.topic}</h3>
          <p className="text-xs text-muted-foreground">
            {session.category} · {formatDate(session.createdAt)}
          </p>
        </div>
        <div className="text-2xl font-bold tabular-nums shrink-0" style={{ color }}>
          {session.frictionScore}%
        </div>
      </div>

      {/* Status */}
      <StatusBadge status={status} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Activity, label: "Theory", value: `${session.theoryPracticeRatio}%` },
          { icon: Zap, label: "Switches", value: session.contextSwitches },
          { icon: Clock, label: "Delay", value: `${session.feedbackDelay}h` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-secondary/50 rounded-lg p-2.5 text-center">
            <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
            <div className="text-sm font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Friction Drivers */}
      {session.frictionDrivers?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Friction Drivers
          </p>
          <ul className="space-y-1">
            {session.frictionDrivers.slice(0, 3).map((d, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-orange-400 shrink-0">·</span> {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```
