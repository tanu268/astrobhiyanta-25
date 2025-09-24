import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Satellite, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen starfield relative bg-gradient-space flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Satellite className="h-8 w-8 text-primary animate-pulse-glow" />
            <div>
              <h1 className="text-xl font-orbitron font-bold">AstroBhiyanta</h1>
              <p className="text-sm text-muted-foreground">
                Asteroid Impact Assessment Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-accent text-accent">
              <div className="h-2 w-2 bg-accent rounded-full mr-2 animate-pulse" />
              LIVE NASA NEO Feed
            </Badge>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/home">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative">
        <iframe
          src="https://eyes.nasa.gov/apps/asteroids/#/home"
          className="absolute top-0 left-0 w-full h-full"
          style={{ border: "none" }}
          title="NASA Eyes on Asteroids"
        />
      </main>
    </div>
  );
};

export default Dashboard;
