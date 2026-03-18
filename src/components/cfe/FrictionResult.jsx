
```jsx
import { useNavigate } from "react-router-dom";
import ScoreGauge from "@/components/ScoreGauge";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { getFrictionColor, getFrictionStatus } from "@/lib/utils";
import {
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Activity,
} from "lucide-react";

export default function FrictionResult({ result, formData }) {
  const navigate = useNavigate();
  const color = getFrictionColor(result.frictionScore);
  const status = getFrictionStatus(result.frictionScore);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/FrictionEngine")}
        className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        New Analysis
      </Button>

      {/* Score Ring */}
      <div className="flex flex-col items-center py-6">
        <ScoreGauge
          score={result.frictionScore}
          size={220}
          color={color}
          label="Cognitive Friction"
        />
        <div className="mt-4">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Topic + Stats */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">{formData.topic}</h2>
          <p className="text-sm text-muted-foreground mt-1">{formData.category}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Theory Ratio", value: `${formData.theoryPracticeRatio}%` },
            { label: "Context Switches", value: formData.contextSwitches },
            { label: "Feedback Delay", value: `${formData.feedbackDelay}h` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-secondary/50 border border-border rounded-xl p-4 text-center"
            >
              <div className="text-xl font-bold text-foreground tabular-nums">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Friction Drivers */}
      {result.frictionDrivers && result.frictionDrivers.length > 0 && (
        <div
          className="rounded-xl p-5 space-y-3"
          style={{
            background: "rgba(249,115,22,0.06)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400">Friction Drivers</span>
          </h3>
          <ul className="space-y-2">
            {result.frictionDrivers.map((driver, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{driver}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Path Steps */}
      {formData.steps && formData.steps.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-400" />
            Path Steps
          </h3>
          <div className="space-y-3">
            {formData.steps.map((step, idx) => (
              <div key={step.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs text-muted-foreground w-4">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-foreground">
                      {step.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {step.hasFeedback && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        feedback
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {step.type.split(" / ")[0].toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden ml-6">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${step.difficulty}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimization Tips */}
      {result.optimizationTips && result.optimizationTips.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400" />
            Optimization Tips
          </h3>
          <ul className="space-y-2">
            {result.optimizationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      <div
        className="rounded-xl p-5 space-y-3"
        style={{
          background: "rgba(249,115,22,0.06)",
          border: "1px solid rgba(249,115,22,0.25)",
        }}
      >
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-orange-400" />
          Recommendation
        </h3>
        <div className="space-y-3">
          {result.recommendation
            .split("\n")
            .filter(Boolean)
            .map((para, i) => (
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
          {result.detailedAnalysis
            .split("\n")
            .filter(Boolean)
            .map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
        </div>
      </div>

      {/* Improvement Potential */}
      {result.estimatedImprovementPotential && (
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-2">
            Improvement Potential
          </h3>
          <p className="text-sm text-muted-foreground">
            {result.estimatedImprovementPotential}
          </p>
        </div>
      )}
    </div>
  );
}
```
