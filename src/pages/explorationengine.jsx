
```jsx
import { useState } from "react";
import { toast } from "sonner";
import { Compass } from "lucide-react";
import ExplorationForm from "@/components/ese/ExplorationForm";
import ExplorationResult from "@/components/ese/ExplorationResult";
import { analyzeExplorationSaturation } from "@/API/googlegemini";
import { useAuth } from "@/lib/authquantext";

export default function ExplorationEngine() {
  const { saveSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const analysis = await analyzeExplorationSaturation(data);
      const sessionData = {
        ...data,
        ...analysis,
        type: "exploration",
      };
      saveSession(sessionData);
      setFormData(data);
      setResult(analysis);
      toast.success("Analysis complete!");
    } catch (err) {
      toast.error(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show result view
  if (result && formData) {
    return (
      <div className="max-w-3xl mx-auto">
        <ExplorationResult result={result} formData={formData} />
      </div>
    );
  }

  // Show form view
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <Compass className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Exploration Saturation Engine
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter your research data and we'll calculate when further
            exploration stops improving your decision quality.
          </p>
        </div>
      </div>

      {/* Form */}
      <ExplorationForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
```
