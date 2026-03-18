```jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Loader2, Compass } from "lucide-react";
import { EXPLORATION_CATEGORIES } from "@/lib/app-params";
import { createTopOption } from "../../../entities/Exploration Session";
import { cn } from "@/lib/utils";

export default function ExplorationForm({ onSubmit, loading }) {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [optionsExplored, setOptionsExplored] = useState([5]);
  const [hoursSpent, setHoursSpent] = useState([2]);
  const [sourcesConsulted, setSourcesConsulted] = useState([10]);
  const [comparisonsMade, setComparisonsMade] = useState([3]);
  const [topOptions, setTopOptions] = useState([createTopOption("", 70)]);
  const [notes, setNotes] = useState("");

  const addOption = () => {
    if (topOptions.length < 5) {
      setTopOptions([...topOptions, createTopOption("", 70)]);
    }
  };

  const removeOption = (id) => {
    if (topOptions.length > 1) {
      setTopOptions(topOptions.filter((o) => o.id !== id));
    }
  };

  const updateOption = (id, field, value) => {
    setTopOptions(
      topOptions.map((o) => (o.id === id ? { ...o, [field]: value } : o))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    if (!category) return;
    onSubmit({
      topic: topic.trim(),
      category,
      optionsExplored: optionsExplored[0],
      hoursSpent: hoursSpent[0],
      sourcesConsulted: sourcesConsulted[0],
      comparisonsMade: comparisonsMade[0],
      topOptions: topOptions.filter((o) => o.name.trim()),
      additionalNotes: notes.trim(),
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Topic */}
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-sm font-medium">
            What are you trying to decide?
          </Label>
          <Input
            id="topic"
            placeholder="e.g. Which laptop to buy"
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
              {EXPLORATION_CATEGORIES.map((cat) => (
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

        {/* Sliders Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Options Explored */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Options explored</Label>
              <span className="text-sm font-bold text-foreground tabular-nums">
                {optionsExplored[0]}
              </span>
            </div>
            <Slider
              value={optionsExplored}
              onValueChange={setOptionsExplored}
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Hours Spent */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Hours spent</Label>
              <span className="text-sm font-bold text-foreground tabular-nums">
                {hoursSpent[0]}
              </span>
            </div>
            <Slider
              value={hoursSpent}
              onValueChange={setHoursSpent}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Sliders Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sources Consulted */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Sources consulted</Label>
              <span className="text-sm font-bold text-foreground tabular-nums">
                {sourcesConsulted[0]}
              </span>
            </div>
            <Slider
              value={sourcesConsulted}
              onValueChange={setSourcesConsulted}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Comparisons Made */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Comparisons made</Label>
              <span className="text-sm font-bold text-foreground tabular-nums">
                {comparisonsMade[0]}
              </span>
            </div>
            <Slider
              value={comparisonsMade}
              onValueChange={setComparisonsMade}
              min={0}
              max={50}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Top Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Top options you've identified
            </Label>
            {topOptions.length < 5 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addOption}
                className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10 h-8 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {topOptions.map((option, idx) => (
              <div key={option.id} className="flex items-center gap-3">
                <Input
                  placeholder={`Option ${idx + 1}`}
                  value={option.name}
                  onChange={(e) =>
                    updateOption(option.id, "name", e.target.value)
                  }
                  className="flex-1 bg-secondary border-border h-10"
                />
                <div className="flex items-center gap-2 w-40">
                  <Slider
                    value={[option.confidence]}
                    onValueChange={([val]) =>
                      updateOption(option.id, "confidence", val)
                    }
                    min={0}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
                    {option.confidence}
                  </span>
                </div>
                {topOptions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(option.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Additional notes{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Textarea
            placeholder="Any context about your research process..."
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
              ? "bg-primary/50 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Compass className="w-5 h-5" />
              Calculate Saturation Score
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
```
