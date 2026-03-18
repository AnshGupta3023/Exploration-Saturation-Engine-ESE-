
```jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authquantext";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/shared/AppLayout";
import {
  LayoutDashboard, Compass, Zap, History,
  LogOut, Menu, X, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { path: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/ExplorationEngine", label: "Exploration Saturation", icon: Compass },
  { path: "/FrictionEngine", label: "Cognitive Friction", icon: Zap },
  { path: "/History", label: "History", icon: History },
];

export default function Layout({ children, authPage, signupPage, resetPage }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (authPage) return <AppLayout signupPage={signupPage} resetPage={resetPage} />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/Dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg">DecisionIQ</span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ path, label, icon: Icon }) => (
              <NavLink key={path} to={path}
                className={({ isActive }) => cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}>
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"
              onClick={() => { logout(); navigate("/login"); }}
              className="hidden md:flex gap-2 text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden"
              onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
            {NAV.map(({ path, label, icon: Icon }) => (
              <NavLink key={path} to={path} onClick={() => setOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all",
                  isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}>
                <Icon className="w-4 h-4" /> {label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-border">
              <Button variant="ghost" size="sm"
                onClick={() => { logout(); navigate("/login"); }}
                className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  );
}
```
