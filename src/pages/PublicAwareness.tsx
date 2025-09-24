import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Zap, 
  Users, 
  Building2, 
  Waves, 
  ArrowLeft,
  RotateCcw,
  Share2,
  Download,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ARVRScenarioModule } from "@/components/ar-vr/ARVRScenarioModule";
import { MapContainer, TileLayer, Popup, useMapEvents, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Type definition for impact results from the calculation function
type ImpactResult = {
  energy: number;
  crater_km: number;
  fireball_km: number;
  severe_km: number;
  moderate_km: number;
  casualties: number;
  buildingsDestroyed: string;
  tsunamiRisk: string;
  severityLevel: 'Low' | 'Moderate' | 'High' | 'Catastrophic';
};

// Function to calculate impact parameters based on user input
function calculateImpact(
  diameter_m: number,
  speed_kms: number,
  angle_deg: number,
  density: number,
  selectedCity: string,
  cities: { id: string; name: string; population: string; lat: number; lng: number }[]
): ImpactResult {
  const radius_m = diameter_m / 2;
  const mass_kg = density * (4 / 3) * Math.PI * Math.pow(radius_m, 3);
  const velocity_mps = speed_kms * 1000;
  const energy_joules = 0.5 * mass_kg * Math.pow(velocity_mps, 2);

  // Convert energy to megatons of TNT (1 Mt = 4.184e15 J)
  const energy_mt = energy_joules / 4.184e15;

  // Realistic formulas for impact effects (in km)
  const fireball_radius_km = 0.45 * Math.pow(energy_mt, 1/3); 
  const severe_damage_radius_km = 2.0 * Math.pow(energy_mt, 1/3); // Approx. pressure wave radius
  const moderate_damage_radius_km = 4.0 * Math.pow(energy_mt, 1/3); // Approx. shockwave radius
  const crater_diameter_km = 0.5 * Math.pow(energy_mt, 1/3.4); // Simplified scaling law

  // Calculate severity based on energy
  const severityValue = energy_mt;
  let severityLevel: 'Low' | 'Moderate' | 'High' | 'Catastrophic';
  if (severityValue < 10) severityLevel = "Low";
  else if (severityValue < 50) severityLevel = "Moderate";
  else if (severityValue < 200) severityLevel = "High";
  else severityLevel = "Catastrophic";

  // Calculate casualties based on severity and city population
  const city = cities.find(c => c.id === selectedCity);
  const populationM = parseFloat(city?.population.replace('M', '') || '1');
  let multiplier = 0.1;
  if (severityLevel === "Moderate") multiplier = 0.3;
  if (severityLevel === "High") multiplier = 0.6;
  if (severityLevel === "Catastrophic") multiplier = 0.9;
  const casualties = Math.round(populationM * multiplier * 1000000);

  // Determine buildings destroyed and tsunami risk
  let buildingsDestroyed: string;
  if (severityLevel === "Low") buildingsDestroyed = "15%";
  else if (severityLevel === "Moderate") buildingsDestroyed = "45%";
  else if (severityLevel === "High") buildingsDestroyed = "75%";
  else buildingsDestroyed = "95%";

  const tsunamiRisk = (angle_deg < 30 && (selectedCity === "new-york" || selectedCity === "tokyo" || selectedCity === "sydney")) ? "High" : "N/A";

  return {
    energy: energy_mt,
    crater_km: crater_diameter_km,
    fireball_km: fireball_radius_km,
    severe_km: severe_damage_radius_km,
    moderate_km: moderate_damage_radius_km,
    casualties,
    buildingsDestroyed,
    tsunamiRisk,
    severityLevel,
  };
}

// Component to handle map clicks and set the impact point
function ImpactMarker({ setImpactPoint, onImpact }: { setImpactPoint: (point: [number, number]) => void, onImpact: () => void }) {
  useMapEvents({
    click(e) {
      setImpactPoint([e.latlng.lat, e.latlng.lng]);
      onImpact();
    },
  });
  return null;
}

const ImpactSimulator = () => {
  const [asteroidSize, setAsteroidSize] = useState([1000]);
  const [asteroidSpeed, setAsteroidSpeed] = useState([25]);
  const [impactAngle, setImpactAngle] = useState([45]);
  const [selectedCity, setSelectedCity] = useState("new-york");
  const [isCalculating, setIsCalculating] = useState(false);
  const [impactPoint, setImpactPoint] = useState<[number, number] | null>(null);
  const [impactResults, setImpactResults] = useState<ImpactResult | null>(null);

  // Expanded city data with coordinates
  const cities = [
    { id: "new-york", name: "New York City", population: "8.4M", lat: 40.7128, lng: -74.0060 },
    { id: "london", name: "London", population: "9.5M", lat: 51.5074, lng: -0.1278 },
    { id: "tokyo", name: "Tokyo", population: "14M", lat: 35.6895, lng: 139.6917 },
    { id: "mumbai", name: "Mumbai", population: "12.5M", lat: 19.0760, lng: 72.8777 },
    { id: "sydney", name: "Sydney", population: "5.3M", lat: -33.8688, lng: 151.2093 },
    { id: "cairo", name: "Cairo", population: "10.1M", lat: 30.0444, lng: 31.2357 },
    { id: "sao-paulo", name: "São Paulo", population: "12.4M", lat: -23.5505, lng: -46.6333 }
  ];

  const handleCalculateImpact = () => {
    setIsCalculating(true);
    const res = calculateImpact(
      asteroidSize[0],
      asteroidSpeed[0],
      impactAngle[0],
      300, // Example density
      selectedCity,
      cities
    );
    setImpactResults(res);
    setTimeout(() => {
      setIsCalculating(false);
    }, 1000);
  };

  const getBlastRadius = () => {
    return Math.round(impactResults?.fireball_km || 0);
  };

  const getEstimatedCasualties = () => {
    const city = cities.find(c => c.id === selectedCity);
    const populationM = parseFloat(city?.population.replace('M', '') || '1');
    const severity = impactResults?.severityLevel;
    
    let multiplier = 0.1;
    if (severity === "Moderate") multiplier = 0.3;
    if (severity === "High") multiplier = 0.6;
    if (severity === "Catastrophic") multiplier = 0.9;
    
    const casualties = Math.round(populationM * multiplier * 1000000);
    return casualties.toLocaleString();
  };

  const severityColor = (level: string) => {
    if (level === "Low") return "default";
    if (level === "Moderate") return "secondary";
    if (level === "High" || level === "Catastrophic") return "destructive";
    return "default";
  };
  
  const selectedCityData = cities.find(c => c.id === selectedCity);

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
              <h1 className="text-xl font-orbitron font-bold">What If Scenario</h1>
              <p className="text-sm text-muted-foreground">Explore asteroid impact effects on your city</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share(coming soon)
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Save Results(coming soon)
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <Tabs defaultValue="impact-calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="impact-calculator">Impact Calculator</TabsTrigger>
            <TabsTrigger value="map-simulation">Map Simulation</TabsTrigger>
            <TabsTrigger value="ar-vr-scenarios">
              <Eye className="mr-2 h-4 w-4" />
              AR/VR Scenarios
            </TabsTrigger>
          </TabsList>

          {/* Impact Calculator Tab */}
          <TabsContent value="impact-calculator">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Controls Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Parameters</CardTitle>
                    <CardDescription>Adjust the asteroid characteristics to see different scenarios</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Asteroid Diameter: {asteroidSize[0]}m</Label>
                      <Slider
                        value={asteroidSize}
                        onValueChange={setAsteroidSize}
                        max={2000}
                        min={100}
                        step={50}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Small</span>
                        <span>Extinction Event</span>
                      </div>
                    </div>

                    <div>
                      <Label>Impact Velocity: {asteroidSpeed[0]} km/s</Label>
                      <Slider
                        value={asteroidSpeed}
                        onValueChange={setAsteroidSpeed}
                        max={50}
                        min={10}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Slow</span>
                        <span>Hypersonic</span>
                      </div>
                    </div>

                    <div>
                      <Label>Impact Angle: {impactAngle[0]}°</Label>
                      <Slider
                        value={impactAngle}
                        onValueChange={setImpactAngle}
                        max={90}
                        min={15}
                        step={5}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Shallow</span>
                        <span>Vertical</span>
                      </div>
                    </div>

                    <div>
                      <Label>Target City</Label>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name} ({city.population})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleCalculateImpact}
                      className="w-full" 
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <>
                          <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Calculate Impact
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Educational Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Did You Know?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p>
                      The Chicxulub asteroid that killed the dinosaurs was approximately 10-15km in diameter.
                    </p>
                    <p>
                      NASA tracks over 28,000 near-Earth objects and discovers about 3,000 new ones each year.
                    </p>
                    <p>
                      A 140-meter asteroid could devastate an entire metropolitan area.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Results Display */}
              <div className="lg:col-span-2 space-y-6">
                {/* Impact Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        Impact on {selectedCityData?.name}
                      </span>
                      <Badge 
                        variant={severityColor(impactResults?.severityLevel || "Low")}
                      >
                        {impactResults?.severityLevel || "Low"} Impact
                      </Badge>
                    </CardTitle>
                    <CardDescription>Simulated blast effects for a {asteroidSize[0]}m asteroid hitting {selectedCityData?.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-secondary/20 rounded-lg">
                        <Zap className="h-6 w-6 mx-auto mb-2 text-warning" />
                        <div className="text-2xl font-bold font-orbitron">{getBlastRadius()}km</div>
                        <div className="text-xs text-muted-foreground">Blast Radius</div>
                      </div>
                      
                      <div className="text-center p-4 bg-destructive/10 rounded-lg">
                        <Users className="h-6 w-6 mx-auto mb-2 text-destructive" />
                        <div className="text-2xl font-bold font-orbitron">{getEstimatedCasualties()}</div>
                        <div className="text-xs text-muted-foreground">Est. Casualties</div>
                      </div>
                      
                      <div className="text-center p-4 bg-warning/10 rounded-lg">
                        <Building2 className="h-6 w-6 mx-auto mb-2 text-warning" />
                        <div className="text-2xl font-bold font-orbitron">
                          {impactResults?.buildingsDestroyed}
                        </div>
                        <div className="text-xs text-muted-foreground">Buildings Destroyed</div>
                      </div>
                      
                      <div className="text-center p-4 bg-info/10 rounded-lg">
                        <Waves className="h-6 w-6 mx-auto mb-2 text-info" />
                        <div className="text-2xl font-bold font-orbitron">
                          {impactResults?.tsunamiRisk}
                        </div>
                        <div className="text-xs text-muted-foreground">Tsunami Risk</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Visual Impact Representation - Placeholder or simple graphic */}
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Visualization</CardTitle>
                    <CardDescription>
                      Simulated blast effects for a {asteroidSize[0]}m asteroid hitting {selectedCityData?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-80 bg-gradient-space rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 bg-secondary/30 rounded-full flex items-center justify-center border-2 border-secondary">
                          <Building2 className="h-8 w-8 text-secondary-foreground" />
                        </div>
                        
                        <div 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-destructive animate-ping"
                          style={{
                            width: `${Math.min(getBlastRadius() * 8, 300)}px`,
                            height: `${Math.min(getBlastRadius() * 8, 300)}px`,
                          }}
                        />
                        <div 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-warning/50"
                          style={{
                            width: `${Math.min(getBlastRadius() * 12, 400)}px`,
                            height: `${Math.min(getBlastRadius() * 12, 400)}px`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Map Simulation Tab */}
          <TabsContent value="map-simulation">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Map Simulation Controls</CardTitle>
                    <CardDescription>Adjust the parameters and click on the map to see the simulated impact.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Asteroid Diameter: {asteroidSize[0]}m</Label>
                      <Slider value={asteroidSize} onValueChange={setAsteroidSize} max={2000} min={100} step={50} />
                    </div>
                    <div>
                      <Label>Impact Velocity: {asteroidSpeed[0]} km/s</Label>
                      <Slider value={asteroidSpeed} onValueChange={setAsteroidSpeed} max={50} min={10} step={1} />
                    </div>
                    <div>
                      <Label>Impact Angle: {impactAngle[0]}°</Label>
                      <Slider value={impactAngle} onValueChange={setImpactAngle} max={90} min={15} step={5} />
                    </div>
                    <Button onClick={() => setImpactResults(calculateImpact(asteroidSize[0], asteroidSpeed[0], impactAngle[0], 300, selectedCity, cities))} className="w-full">
                      <Zap className="mr-2 h-4 w-4" />
                      Run Simulation
                    </Button>
                  </CardContent>
                </Card>
                {impactResults && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Impact Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Energy Released: {(impactResults.energy).toFixed(2)} Mt TNT</p>
                      <p>Crater Diameter: {(impactResults.crater_km).toFixed(2)} km</p>
                      <p>Blast Radius: {(impactResults.fireball_km).toFixed(2)} km</p>
                      <p>Severe Damage: {(impactResults.severe_km).toFixed(2)} km</p>
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Simulation Map</CardTitle>
                    <CardDescription>Click anywhere on the map to choose the impact site and visualize the effects.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[600px] w-full">
<MapContainer
  center={(impactPoint || [20, 0]) as [number, number]}
  zoom={impactPoint ? 5 : 2}
  attributionControl={false}
  className="h-full w-full rounded-lg"
>
  <TileLayer
    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  />

  {/* Click listener */}
  <ImpactMarker 
    setImpactPoint={setImpactPoint} 
    onImpact={() => setImpactResults(
      calculateImpact(asteroidSize[0], asteroidSpeed[0], impactAngle[0], 300, selectedCity, cities)
    )} 
  />

  {/* Show blast radius if impact point exists */}
  {impactPoint && impactResults && (
    <Circle
      center={impactPoint}
      radius={impactResults.fireball_km * 1000} // km → meters
      pathOptions={{ color: "red", fillColor: "yellow", fillOpacity: 0.3 }}
    />
  )}
</MapContainer>


                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AR/VR Scenarios Tab */}
          <TabsContent value="ar-vr-scenarios">
            <ARVRScenarioModule
              asteroidSize={asteroidSize[0]}
              asteroidSpeed={asteroidSpeed[0]}
              impactAngle={impactAngle[0]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImpactSimulator;