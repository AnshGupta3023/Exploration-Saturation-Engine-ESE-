
```jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Loader2, Zap } from "lucide-react";
import { FRICTION_CATEGORIES, STEP_TYPES } from "@/lib/app-params";
import { createStep } from "../../../entities/Friction Session";
import { cn } from "@/lib/utils";

export default function FrictionForm({ onSubmit, loading }) {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState([createStep("", "Theory / Reading")]);
  const [theoryRatio, setTheoryRatio] = useState([60]);
  const [contextSwitches, setContextSwitches] = useState([3]);
  const [feedbackDelay, setFeedbackDelay] = useState([24]);
  const [notes, setNotes] = useState("");

  const addStep = () => {
    if (steps.length < 8) {
      setSteps([...steps, createStep("", "Theory / Reading")]);
    }
  };

  const removeStep = (id) => {
    if (steps.length > 1) {
      setSteps(steps.filter((s) => s.id !== id));
    }
  };

  const updateStep = (id, field, value) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || !category) return;
    onSubmit({
      topic: topic.trim(),
      category,
      steps: steps.filter((s) => s.name.trim()),
      theoryPracticeRatio: theoryRatio[0],
      contextSwitches: contextSwitches[0],
      feedbackDelay: feedbackDelay[0],
      additionalNotes: notes.trim(),
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Topic */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            What are you learning or working on?
          </Label>
          <Input
            placeholder="e.g. Machine Learning Fundamentals"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-secondary border-border h-11"
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-secondary border-border h-11">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {FRICTION_CATEGORIES.map((cat) => (
                <SelectItem
                  key={cat}
                  value={cat}
                  className="hover:bg-accent focus:bg-accent"
                >
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Steps in your path</Label>
            {steps.length < 8 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addStep}
                className="gap-1.5 text-orange-400 hover:text-orange-400 hover:bg-orange-500/10 h-8 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Step
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="bg-secondary/40 border border-border rounded-xl p-4 space-y-3"
              >
                {/* Step number + name */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono w-4 shrink-0">
                    {idx + 1}
                  </span>
                  <Input
                    placeholder={`Step ${idx + 1} name`}
                    value={step.name}
                    onChange={(e) =>
                      updateStep(step.id, "name", e.target.value)
                    }
                    className="flex-1 bg-background/50 border-border h-9 text-sm"
                  />
                  {steps.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStep(step.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>

                {/* Step type + difficulty + feedback */}
                <div className="flex items-center gap-4 pl-7">
                  <Select
                    value={step.type}
                    onValueChange={(val) => updateStep(step.id, "type", val)}
                  >
                    <SelectTrigger className="bg-background/50 border-border h-8 text-xs w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {STEP_TYPES.map((t) => (
                        <SelectItem key={t} value={t} className="text-xs">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-muted-foreground shrink-0">
                      Difficulty
                    </span>
                    <Slider
                      value={[step.difficulty]}
                      onValueChange={([val]) =>
                        updateStep(step.id, "difficulty", val)
                      }
                      min={0}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground tabular-nums w-7 text-right">
                      {step.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      Feedback
                    </span>
                    <Switch
                      checked={step.hasFeedback}
                      onCheckedChange={(val) =>
                        updateStep(step.id, "hasFeedback", val)
                      }
                      className="data-[state=checked]:bg-orange-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theory vs Practice */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Theory vs Practice ratio
            </Label>
            <span className="text-sm font-bold tabular-nums">
              {theoryRatio[0]}%
            </span>
          </div>
          <Slider
            value={theoryRatio}
            onValueChange={setTheoryRatio}
            min={0}
            max={100}
            step={1}
          />
          <p className="text-xs text-muted-foreground">
            {theoryRatio[0]}% theory, {100 - theoryRatio[0]}% practice
          </p>
        </div>

        {/* Context Switches + Feedback Delay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Context switches</Label>
              <span className="text-sm font-bold tabular-nums">
                {contextSwitches[0]}
              </span>
            </div>
            <Slider
              value={contextSwitches}
              onValueChange={setContextSwitches}
              min={0}
              max={20}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Feedback delay (hours)
              </Label>
              <span className="text-sm font-bold tabular-nums">
                {feedbackDelay[0]}h
              </span>
            </div>
            <Slider
              value={feedbackDelay}
              onValueChange={setFeedbackDelay}
              min={0}
              max={72}
              step={1}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Additional notes{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Textarea
            placeholder="Any context about your learning or work path..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-secondary border-border resize-none min-h-[100px]"
            rows={4}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || !topic.trim() || !category}
          className={cn(
            "w-full h-12 text-base font-semibold gap-2 transition-all",
            loading || !topic.trim() || !category
              ? "bg-orange-500/50 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Calculate Friction Score
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
```
