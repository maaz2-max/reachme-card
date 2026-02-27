import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ChevronRight, Home, AlertTriangle } from 'lucide-react';
import logo from "@/assets/reach-logo.png";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("[v0] 404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-center header-blur py-4 border-b border-border">
        <img src={logo} alt="REACH.MME" className="h-8 animate-float" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center space-y-6 max-w-md">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-red-100 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* 404 Header */}
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or may have been removed. The requested URL was: <span className="font-mono text-xs break-all">{location.pathname}</span>
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigate('/')}
              className="btn-3d btn-3d-call w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
            >
              <Home size={16} />
              Return to Home
              <ChevronRight size={14} className="opacity-60" />
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="btn-3d w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Go Back
            </button>
          </div>

          {/* Info Card */}
          <div className="auto-card p-4 mt-6">
            <h3 className="font-semibold text-sm text-foreground mb-3">Troubleshooting Tips</h3>
            <ul className="text-xs text-muted-foreground space-y-2 text-left">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Check if the URL is spelled correctly</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Try refreshing the page</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Clear your browser cache if needed</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Contact support if you believe this is an error</span>
              </li>
            </ul>
          </div>

          {/* Error Details */}
          <div className="text-xs text-muted-foreground/60 p-3 bg-muted rounded border border-border">
            <p>Error ID: 404</p>
            <p>Timestamp: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 text-center text-xs text-muted-foreground border-t border-border">
        <p>© 2026 REACH.MME | <a href="/" className="text-primary hover:underline">Home</a></p>
      </footer>
    </div>
  );
};

export default NotFound;
