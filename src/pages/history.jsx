
```jsx
import { useState } from "react";
import { useAuth } from "@/lib/authquantext";
import { formatDate, truncateText, getSaturationColor, getFrictionColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Compass, Zap, History as HistoryIcon,
  Trash2, Clock, Filter,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Exploration", "Friction"];

export default function History() {
  const { getUserSessions, deleteSession } = useAuth();
  const [filter, setFilter] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  const allSessions = getUserSessions();

  const filtered = allSessions.filter((s) => {
    if (filter === "All") return true;
    if (filter === "Exploration") return s.type === "exploration";
    if (filter === "Friction") return s.type === "friction";
    return true;
  });

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteSession(id);
      setDeletingId(null);
      toast.success("Analysis deleted");
    }, 300);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <HistoryIcon className="w-6 h-6 text-primary" />
          History
        </h1>
        <p className="text-muted-foreground text-sm">
          All your past analyses
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                filter === f
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </span>
      </div>

      {/* Sessions List */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((session) => {
            const isExploration = session.type === "exploration";
            const score = isExploration
              ? session.saturationScore
              : session.frictionScore;
            const color = isExploration
              ? getSaturationColor(score)
              : getFrictionColor(score);
            const isDeleting = deletingId === session.id;

            return (
              <div
                key={session.id}
                className={cn(
                  "flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-4 transition-all duration-300 group",
                  isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
                )}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {isExploration
                    ? <Compass className="w-4 h-4" style={{ color }} />
                    : <Zap className="w-4 h-4" style={{ color }} />
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {truncateText(session.topic, 50)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {session.category} · {formatDate(session.createdAt)}
                  </p>
                </div>

                {/* Score */}
                <div
                  className="text-xl font-bold tabular-nums shrink-0"
                  style={{ color }}
                >
                  {score}%
                </div>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(session.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Clock className="w-8 h-8 text-primary opacity-40" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-foreground font-medium">No analyses found</p>
            <p className="text-sm text-muted-foreground">
              {filter === "All"
                ? "Start your first analysis to see it here"
                : `No ${filter.toLowerCase()} analyses yet`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```
