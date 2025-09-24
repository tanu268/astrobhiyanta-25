import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Target, 
  Shield, 
  BarChart3, 
  Globe, 
  Users, 
  ArrowRight,
  Play,
  ExternalLink,
  Satellite
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import earthAsteroidHero from "@/assets/earth-asteroid-hero.jpg";
import impactSimulation from "@/assets/impact-simulation.jpg";
import missionControl from "@/assets/mission-control.jpg";
import mitigationTech from "@/assets/mitigation-tech.jpg";
import { FirebaseContext } from "../App"; // <-- Your Firebase context from App.tsx
import { collection, getDocs } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  email: string;
}


const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
const { db } = useContext(FirebaseContext); // access Firestore from context
const [users, setUsers] = useState<User[]>([]); // example Firestore data

useEffect(() => {
  async function fetchUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, "users")); // your collection name
      const usersData: User[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  fetchUsers();
}, [db]);


  const handleExploreDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/awareness");
    }, 1500);
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const features = [
    {
      icon: Target,
      title: "Simulate Asteroid Impact",
      description: "Advanced 3D simulations using real NASA NEO data to visualize potential impact scenarios with precise damage modeling.",
      image: impactSimulation,
      color: "primary",
      link: "/dashboard"
    },
    {
      icon: Shield,
      title: "Explore Mitigation Strategies",
      description: "Compare planetary defense options including kinetic impactors, nuclear deflection, and gravity tractors.",
      image: mitigationTech,
      color: "accent",
      link: "/mitigation"
    },
    {
      icon: BarChart3,
      title: "Decision Support for Leaders",
      description: "Risk assessments, casualty estimates, and evacuation planning tools for policymakers and emergency responders.",
      image: missionControl,
      color: "warning",
      link: "/report"
    }
  ];

  return (
    <div className="min-h-screen starfield relative bg-gradient-space">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Satellite className="h-8 w-8 text-primary animate-pulse-glow" />
            <div>
              <h1 className="text-xl font-orbitron font-bold">AstroBhiyanta</h1>
              <p className="text-xs text-muted-foreground">NASA Space Apps 2025</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
           
            <Button variant="outline" size="sm" onClick={handleLogin}>
              Login / Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={earthAsteroidHero}
            alt="Earth with approaching asteroid"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm animate-float">
            <Globe className="h-3 w-3 mr-1" />
            NASA Space Apps Challenge 2025
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 bg-gradient-aurora bg-clip-text text-transparent animate-pulse-glow">
            Visualize. Simulate.
            <br />
            Mitigate Asteroid Threats.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced asteroid impact visualization and mitigation planning system 
            powered by real NASA data and cutting-edge simulation technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-glow"
              onClick={handleExploreDemo}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Rocket className="mr-2 h-5 w-5 animate-bounce" />
                  Launching Demo...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Explore Demo
                </>
              )}
            </Button>
            
          </div>
        </div>

        {/* Floating asteroid animation */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-warning rounded-full animate-orbit opacity-60" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-accent rounded-full animate-orbit opacity-40" style={{animationDelay: "5s"}} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Satellite className="h-6 w-6 text-primary" />
                <span className="font-orbitron font-bold">Team AstroBhiyanta</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advancing planetary defense through innovative visualization and simulation technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/dashboard" className="block hover:text-primary transition-colors">Mission Control</Link>
                <Link to="/awareness" className="block hover:text-primary transition-colors">Public Demo</Link>
                <Link to="/mitigation" className="block hover:text-primary transition-colors">Mitigation Strategies</Link>
                <Link to="/about" className="block hover:text-primary transition-colors">About Team</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Data Sources</h3>
              <div className="space-y-2 text-sm">
                <a href="https://cneos.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer" 
                   className="block hover:text-primary transition-colors">
                  <ExternalLink className="inline h-3 w-3 mr-1" />
                  NASA CNEOS
                </a>
                <a href="https://www.esa.int/" target="_blank" rel="noopener noreferrer"
                   className="block hover:text-primary transition-colors">
                  <ExternalLink className="inline h-3 w-3 mr-1" />
                  ESA Space
                </a>
                <a href="https://www.usgs.gov/" target="_blank" rel="noopener noreferrer"
                   className="block hover:text-primary transition-colors">
                  <ExternalLink className="inline h-3 w-3 mr-1" />
                  USGS Data
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Team AstroBhiyanta. NASA Space Apps Challenge 2025.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="border-primary/20 text-primary">
                <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" 
                     alt="NASA" className="h-4 w-8 mr-2 invert" />
                NASA
              </Badge>
              <Badge variant="outline" className="border-secondary/20 text-secondary-foreground">
                USGS
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
