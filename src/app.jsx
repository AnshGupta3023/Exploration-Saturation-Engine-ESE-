
```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/authquantext";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/dashboard";
import ExplorationEngine from "@/pages/explorationengine";
import FrictionEngine from "@/pages/frictionengine";
import History from "@/pages/history";
import PageNotFound from "@/lib/pagenotfound";
import { Toaster } from "sonner";

function Loader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-primary/20" />
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin absolute inset-0" />
      </div>
    </div>
  );
}

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AuthOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (user) return <Navigate to="/Dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" replace />} />

        {/* Auth */}
        <Route path="/login" element={<AuthOnly><Layout authPage /></AuthOnly>} />
        <Route path="/signup" element={<AuthOnly><Layout authPage signupPage /></AuthOnly>} />
        <Route path="/reset-password" element={<AuthOnly><Layout authPage resetPage /></AuthOnly>} />

        {/* App */}
        <Route path="/Dashboard" element={<Protected><Layout><Dashboard /></Layout></Protected>} />
        <Route path="/ExplorationEngine" element={<Protected><Layout><ExplorationEngine /></Layout></Protected>} />
        <Route path="/FrictionEngine" element={<Protected><Layout><FrictionEngine /></Layout></Protected>} />
        <Route path="/History" element={<Protected><Layout><History /></Layout></Protected>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster richColors position="top-right"
        toastOptions={{
          style: {
            background: "hsl(224 71% 6%)",
            border: "1px solid hsl(216 34% 13%)",
            color: "hsl(213 31% 91%)",
          },
        }}
      />
    </>
  );
}
```
