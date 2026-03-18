
```jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authquantext";
import StatCard from "@/components/Statcard";
import { Button } from "@/components/ui/button";
import { formatDate, truncateText, getSaturationColor, getFrictionColor } from "@/lib/utils";
import {
  Compass, Zap, TrendingUp, Activity,
  ArrowRight, LayoutDashboard, Clock,
} from "lucide-react";

export default function Dashboard() {
  const { getUserStats, getUserSessions } = useAuth();
  const navigate = useNavigate();
  const stats = getUserStats();
  const recentSessions = getUserSessions().slice(0, 5);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <LayoutDashboard className="w-3.5 h-3.5" />
          Decision Intelligence Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Stop overthinking.{" "}
          <span className="gradient-text-purple">Start deciding.</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Measure when your research has reached diminishing returns and reduce
          cognitive friction in your workflows.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Explorations"
          value={stats.totalExplorations}
          icon={Compass}
          className="bg-purple-500/8 border-purple-500/20"
          valueClassName="text-foreground"
        />
        <StatCard
          title="Friction Analyses"
          value={stats.totalFrictions}
          icon={Zap}
          className="bg-orange-500/8 border-orange-500/20"
          valueClassName="text-foreground"
        />
        <StatCard
          title="Avg Saturation"
          value={stats.totalExplorations > 0 ? `${stats.avgSaturation}%` : "0%"}
          icon={TrendingUp}
          className="bg-emerald-500/8 border-emerald-500/20"
          valueClassName="text-foreground"
        />
        <StatCard
          title="Avg Friction"
          value={stats.totalFrictions > 0 ? `${stats.avgFriction}%` : "0%"}
          icon={Activity}
          className="bg-indigo-500/8 border-indigo-500/20"
          valueClassName="text-foreground"
        />
      </div>

      {/* Engine Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Exploration Card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:border-primary/30 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
            <Compass className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">
              Exploration Saturation Engine
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover when additional research stops improving your decision
              quality. Get a clear saturation score and actionable
              recommendations.
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/ExplorationEngine")}
            className="gap-2 text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-medium"
          >
            Start Analysis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Friction Card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:border-orange-500/30 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500/25 transition-colors">
            <Zap className="w-6 h-6 text-orange-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">
              Cognitive Friction Engine
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Measure hidden mental resistance in your learning paths and
              workflows. Identify friction drivers and optimize for flow.
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/FrictionEngine")}
            className="gap-2 text-orange-400 hover:text-orange-400 hover:bg-orange-500/10 p-0 h-auto font-medium"
          >
            Start Analysis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      {recentSessions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Recent Activity
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/History")}
              className="gap-1.5 text-muted-foreground hover:text-foreground text-xs"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-2">
            {recentSessions.map((session) => {
              const isExploration = session.type === "exploration";
              const score = isExploration
                ? session.saturationScore
                : session.frictionScore;
              const color = isExploration
                ? getSaturationColor(score)
                : getFrictionColor(score);

              return (
                <div
                  key={session.id}
                  className="flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-4 hover:border-border/80 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    {isExploration
                      ? <Compass className="w-4 h-4" style={{ color }} />
                      : <Zap className="w-4 h-4" style={{ color }} />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {truncateText(session.topic, 45)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isExploration ? "Exploration" : "Friction"} ·{" "}
                      {session.category} ·{" "}
                      {formatDate(session.createdAt)}
                    </p>
                  </div>

                  <div
                    className="text-lg font-bold tabular-nums shrink-0"
                    style={{ color }}
                  >
                    {score}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {recentSessions.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-primary opacity-50" />
          </div>
          <p className="text-muted-foreground text-sm">
            No analyses yet. Start your first analysis above!
          </p>
        </div>
      )}
    </div>
  );
}
```
