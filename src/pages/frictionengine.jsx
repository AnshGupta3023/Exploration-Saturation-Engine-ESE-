
```jsx
import { useState } from "react";
import { toast } from "sonner";
import { Zap } from "lucide-react";
import FrictionForm from "@/components/cfe/FrictionForm";
import FrictionResult from "@/components/cfe/FrictionResult";
import { analyzeCognitiveFriction } from "@/API/googlegemini";
import { useAuth } from "@/lib/authquantext";

export default function FrictionEngine() {
  const { saveSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const analysis = await analyzeCognitiveFriction(data);
      const sessionData = {
        ...data,
        ...analysis,
        type: "friction",
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
        <FrictionResult result={result} formData={formData} />
      </div>
    );
  }

  // Show form view
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
          <Zap className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Cognitive Friction Engine
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Map your learning path or workflow and we'll measure the hidden
            mental resistance holding you back.
          </p>
        </div>
      </div>

      {/* Form */}
      <FrictionForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
```
