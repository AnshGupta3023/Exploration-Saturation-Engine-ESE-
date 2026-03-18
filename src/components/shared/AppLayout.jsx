
```jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authquantext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Brain, Mail, Lock, Eye, EyeOff,
  ArrowLeft, Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function AppLayout({ signupPage, resetPage }) {
  if (resetPage) return <ResetForm />;
  if (signupPage) return <SignUpForm />;
  return <SignInForm />;
}

// ── Wrapper ────────────────────────────────────────────────────────
function Wrap({ children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Logo ───────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
        <Brain className="w-9 h-9 text-primary" />
      </div>
    </div>
  );
}

// ── Sign In ────────────────────────────────────────────────────────
function SignInForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Fill in all fields"); return; }
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      navigate("/Dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <Wrap>
      <Logo />
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome to DecisionIQ</h1>
        <p className="text-muted-foreground text-sm mt-1">Sign in to continue</p>
      </div>
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label>Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-secondary border-border" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Password</Label>
            <Link to="/reset-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type={show ? "text" : "password"} placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-secondary border-border" />
            <button type="button" onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" disabled={loading}
          className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold h-11">
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</> : "Sign in"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
      </p>
    </Wrap>
  );
}

// ── Sign Up ────────────────────────────────────────────────────────
function SignUpForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) { toast.error("Fill in all fields"); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    try {
      await signUp(email, password);
      toast.success("Account created! Welcome!");
      navigate("/Dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <Wrap>
      <Link to="/login" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to sign in
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-6">Create your account</h1>
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label>Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-secondary border-border" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="password" placeholder="Min. 8 characters" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-secondary border-border" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="password" placeholder="Re-enter password" value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="pl-10 bg-secondary border-border" />
          </div>
        </div>
        <Button type="submit" disabled={loading}
          className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold h-11">
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create account"}
        </Button>
      </form>
    </Wrap>
  );
}

// ── Reset Password ─────────────────────────────────────────────────
function ResetForm() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) { toast.error("Enter your email"); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Reset link sent!");
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <Wrap>
      <Link to="/login" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to sign in
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-2">Reset your password</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Enter your email and we'll send you a link to reset your password
      </p>
      {sent ? (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
          <p className="text-primary font-medium text-sm">✓ Reset link sent to {email}</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-secondary border-border" />
            </div>
          </div>
          <Button type="submit" disabled={loading}
            className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold h-11">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : "Send reset link"}
          </Button>
        </form>
      )}
    </Wrap>
  );
}
```
