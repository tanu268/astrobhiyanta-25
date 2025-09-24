import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Rocket, 
  Globe, 
  Users, 
  Award, 
  ExternalLink,
  Satellite,
  Target,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    { name: "Tanu Namdeo", role: "Frontend Developer"},
    { name: "Sneha Kumari", role: "Backend Developer"},
    { name: "Nishtha jain", role: "Data Scientist"},
    { name: "Sakshi Pandey", role: "AR/VR Developer"},
   
  ];

  const technologies = [
    { name: "NASA JPL Horizons", description: "Ephemeris data for asteroid trajectories" },
    { name: "USGS Earthquake Data", description: "Seismic impact modeling" },
    { name: "CNEOS Database", description: "Center for Near-Earth Object Studies data" },
    { name: "ESA Space Situational Awareness", description: "European asteroid tracking" },
    { name: "Minor Planet Center", description: "International asteroid observations" }
  ];

  const impactHistory = [
    {
      year: "65 MYA",
      event: "Chicxulub Impact",
      diameter: "10-15 km",
      location: "Yucatan Peninsula, Mexico",
      effect: "Cretaceous-Paleogene extinction event"
    },
    {
      year: "1908",
      event: "Tunguska Event",
      diameter: "50-60 m",
      location: "Siberia, Russia", 
      effect: "2,000 km² of forest flattened"
    },
    {
      year: "2013",
      event: "Chelyabinsk Meteor",
      diameter: "20 m",
      location: "Russia",
      effect: "1,500+ injured, windows shattered"
    }
  ];

  return (
    <div className="min-h-screen starfield relative bg-gradient-space">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-orbitron font-bold">About AstroBhiyanta</h1>
              <p className="text-sm text-muted-foreground">NASA Space Apps Challenge 2025</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            <Award className="h-3 w-3 mr-1" />
            Team AstroBhiyanta
          </Badge>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto space-y-8">
        
        {/* Mission Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Rocket className="mr-3 h-8 w-8 text-primary" />
              Our Mission
            </CardTitle>
            <CardDescription className="text-lg">
              Democratizing asteroid impact visualization and planetary defense awareness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              The AstroBhiyanta Asteroid Impact Visualization & Mitigation Tool empowers scientists, 
              policymakers, and the public with advanced simulation capabilities to understand and 
              prepare for potential asteroid threats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Visualize</h3>
                <p className="text-sm text-muted-foreground">Interactive 3D impact simulations</p>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg">
                <Globe className="h-8 w-8 mx-auto mb-2 text-accent" />
                <h3 className="font-semibold">Simulate</h3>
                <p className="text-sm text-muted-foreground">Real NASA data modeling</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <Shield className="h-8 w-8 mx-auto mb-2 text-warning" />
                <h3 className="font-semibold">Mitigate</h3>
                <p className="text-sm text-muted-foreground">Planetary defense strategies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6" />
              Team AstroBhiyanta
            </CardTitle>
            <CardDescription>
              Multidisciplinary experts in planetary science and software engineering
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="p-4 bg-secondary/10 rounded-lg">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Satellite className="mr-2 h-6 w-6" />
              Data Sources & Technology
            </CardTitle>
            <CardDescription>
              Leveraging official space agency data and cutting-edge simulation technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">NASA & Space Agency Data</h3>
                <div className="space-y-3">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Technical Implementation</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-card/50 rounded-lg">
                    <div className="font-medium">Frontend</div>
                    <div className="text-sm text-muted-foreground">React, TypeScript, Tailwind CSS</div>
                  </div>
                  <div className="p-3 bg-card/50 rounded-lg">
                    <div className="font-medium">3D Visualization</div>
                    <div className="text-sm text-muted-foreground">WebGL, Three.js, CesiumJS</div>
                  </div>
                  <div className="p-3 bg-card/50 rounded-lg">
                    <div className="font-medium">Data Processing</div>
                    <div className="text-sm text-muted-foreground">NASA APIs, Orbital Mechanics</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact History Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Notable Impact Events in History</CardTitle>
            <CardDescription>
              Learning from past impacts to prepare for future threats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {impactHistory.map((event, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-secondary/10 to-transparent rounded-lg">
                  <div className="text-center min-w-0">
                    <div className="font-bold text-primary">{event.year}</div>
                    <div className="text-xs text-muted-foreground">{event.diameter}</div>
                  </div>
                  <Separator orientation="vertical" className="h-16" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.event}</h3>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                    <p className="text-sm mt-1">{event.effect}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Resources & References</CardTitle>
            <CardDescription>
              Official sources and further reading on planetary defense
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://cneos.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    NASA CNEOS - Center for Near-Earth Object Studies
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://www.esa.int/Safety_Security/Space_Situational_Awareness" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    ESA Space Situational Awareness
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://www.minorplanetcenter.net/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Minor Planet Center
                  </a>
                </Button>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://www.nasa.gov/planetarydefense" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    NASA Planetary Defense Office
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://2025.spaceappschallenge.org/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    NASA Space Apps Challenge 2025
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    JPL Horizons Ephemeris System
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Get Involved</CardTitle>
            <CardDescription>
              Join the planetary defense community and contribute to asteroid awareness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                AstroBhiyanta is an open-source initiative. Connect with us to contribute 
                to planetary defense research and education.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  GitHub Repository
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Research Papers
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;