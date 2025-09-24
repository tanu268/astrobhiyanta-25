import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen starfield relative bg-gradient-space flex items-center justify-center p-4">
      <Card className="max-w-md text-center bg-card/80 backdrop-blur-sm border-border shadow-glow">
        <CardHeader>
          <div className="mx-auto mb-4 p-4 rounded-full bg-destructive/10">
            <Satellite className="h-12 w-12 text-destructive animate-pulse" />
          </div>
          <CardTitle className="text-4xl font-orbitron font-bold mb-2">404</CardTitle>
          <CardTitle className="text-lg font-normal">Mission Route Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The coordinates you're looking for seem to be lost in deep space. 
            Let's navigate back to a known location.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Base
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Error Code: ASTRO-404 | Route: {location.pathname}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
