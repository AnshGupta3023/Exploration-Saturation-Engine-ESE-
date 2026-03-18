
```jsx
import { useNavigate } from "react-router-dom";
import ScoreGauge from "@/components/ScoreGauge";
import StatusBadge from "@/components/shared/StatusBadge";
import ReadinessIndicator from "@/components/ReadinessIndicator";
import { Button } from "@/components/ui/button";
import { getSaturationColor } from "@/lib/utils";
import {
  ArrowLeft,
  Lightbulb,
  BarChart3,
  ChevronRight,
  CheckCircle2,
  Target,
} from "lucide-react";

export default function ExplorationResult({ result, formData }) {
  const navigate = useNavigate();
  const color = getSaturationColor(result.saturationScore);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/ExplorationEngine")}
        className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        New Analysis
      </Button>

      {/* Score Ring */}
      <div className="flex flex-col items-center py-6">
        <ScoreGauge
          score={result.saturationScore}
          size={220}
          color={color}
          label="Exploration Saturation"
        />
        <div className="mt-4">
          <StatusBadge status={result.status} />
        </div>
      </div>

      {/* Topic + Stats */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            {formData.topic}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {formData.category}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Options", value: formData.optionsExplored },
            { label: "Hours", value: formData.hoursSpent },
            { label: "Sources", value: formData.sourcesConsulted },
            { label: "Comparisons", value: formData.comparisonsMade },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-secondary/50 border border-border rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Readiness Indicator */}
      <div className="bg-card border border-border rounded-xl p-5">
        <ReadinessIndicator score={result.saturationScore} />
      </div>

      {/* Top Options */}
      {formData.topOptions && formData.topOptions.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Top Options
          </h3>
          <div className="space-y-3">
            {formData.topOptions.map((opt, idx) => (
              <div key={opt.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-foreground">
                      {opt.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {opt.confidence}%
                  </span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden ml-6">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${opt.confidence}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights */}
      {result.keyInsights && result.keyInsights.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Key Insights
          </h3>
          <ul className="space-y-2">
            {result.keyInsights.map((insight, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      <div className="bg-card border border-primary/20 rounded-xl p-5 space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          Recommendation
        </h3>
        <div className="space-y-3">
          {result.recommendation.split("\n").filter(Boolean).map((para, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <h3 className="font-semibold text-foreground">Detailed Analysis</h3>
        <div className="space-y-3">
          {result.detailedAnalysis.split("\n").filter(Boolean).map((para, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      {result.nextSteps && result.nextSteps.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-foreground">Next Steps</h3>
          <ul className="space-y-2">
            {result.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```
