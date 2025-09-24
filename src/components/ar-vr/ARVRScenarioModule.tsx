import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  Layers, 
  Play, 
  Pause, 
  RotateCcw,
  Info,
  MapPin,
  AlertTriangle,
  Users,
  Route
} from "lucide-react";
import { ScenarioScene } from "./ScenarioScene";
import { ScenarioData, ImpactPhase } from "./types";
import { scenarios } from "./scenarioData";

interface ARVRScenarioModuleProps {
  asteroidSize: number;
  asteroidSpeed: number;
  impactAngle: number;
}

export const ARVRScenarioModule: React.FC<ARVRScenarioModuleProps> = ({
  asteroidSize,
  asteroidSpeed,
  impactAngle
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>("urban-nyc");
  const [currentPhase, setCurrentPhase] = useState<ImpactPhase>("pre-impact");
  const [timeProgress, setTimeProgress] = useState([0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"standard" | "ar" | "vr">("standard");
  const [activeLayersState, setActiveLayersState] = useState({
    damageRadius: true,
    evacuationPaths: false,
    casualtyZones: false,
    infrastructure: true
  });

  const scenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  const phases: { id: ImpactPhase; label: string; time: string }[] = [
    { id: "pre-impact", label: "Pre-Impact", time: "T-10 minutes" },
    { id: "impact", label: "Impact", time: "T+0 seconds" },
    { id: "aftermath", label: "Aftermath", time: "T+1 hour" }
  ];

  const handleTimeChange = (value: number[]) => {
    setTimeProgress(value);
    const progress = value[0];
    if (progress < 33) {
      setCurrentPhase("pre-impact");
    } else if (progress < 66) {
      setCurrentPhase("impact");
    } else {
      setCurrentPhase("aftermath");
    }
  };

  const toggleLayer = (layer: keyof typeof activeLayersState) => {
    setActiveLayersState(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const canUseXR = typeof navigator !== 'undefined' && 'xr' in navigator;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Eye className="mr-2 h-5 w-5" />
                    AR/VR Impact Scenarios
                  </span>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={!canUseXR}
              onClick={() => setViewMode(viewMode === "ar" ? "standard" : "ar")}
            >
              AR View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={!canUseXR}
              onClick={() => setViewMode(viewMode === "vr" ? "standard" : "vr")}
            >
              VR View
            </Button>
            <Badge variant="secondary">
              {scenario.name}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="viewer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="viewer">3D Viewer</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="space-y-4">
            {/* 3D Canvas */}
            <div className="relative h-96 bg-gradient-space rounded-lg overflow-hidden border border-border">
              <Canvas camera={{ position: [0, 50, 100], fov: 60 }}>
                <Suspense fallback={null}>
                  <ScenarioScene
                    scenario={scenario}
                    phase={currentPhase}
                    activeLayers={activeLayersState}
                    asteroidParams={{
                      size: asteroidSize,
                      speed: asteroidSpeed,
                      angle: impactAngle
                    }}
                  />
                </Suspense>
              </Canvas>
              
              {/* Overlay Controls */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 space-y-3">
                  {/* Phase Indicators */}
                  <div className="flex items-center justify-between">
                    {phases.map((phase) => (
                      <div
                        key={phase.id}
                        className={`text-center ${currentPhase === phase.id ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        <div className="text-xs font-medium">{phase.label}</div>
                        <div className="text-xs">{phase.time}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Time Slider */}
                  <div className="space-y-2">
                    <Label className="text-xs">Timeline Progress</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      </Button>
                      <Slider
                        value={timeProgress}
                        onValueChange={handleTimeChange}
                        max={100}
                        min={0}
                        step={1}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setTimeProgress([0]);
                          setCurrentPhase("pre-impact");
                        }}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Hotspots */}
              <div className="absolute top-4 right-4">
                <Button size="sm" variant="secondary" className="text-xs">
                  <Info className="h-3 w-3 mr-1" />
                  Hotspots: {scenario.hotspots.length}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="controls" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Layer Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Layers className="mr-2 h-4 w-4" />
                    Visualization Layers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <Label className="text-sm">Damage Radius</Label>
                    </div>
                    <Switch
                      checked={activeLayersState.damageRadius}
                      onCheckedChange={() => toggleLayer('damageRadius')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Route className="h-4 w-4 text-info" />
                      <Label className="text-sm">Evacuation Paths</Label>
                    </div>
                    <Switch
                      checked={activeLayersState.evacuationPaths}
                      onCheckedChange={() => toggleLayer('evacuationPaths')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-warning" />
                      <Label className="text-sm">Casualty Zones</Label>
                    </div>
                    <Switch
                      checked={activeLayersState.casualtyZones}
                      onCheckedChange={() => toggleLayer('casualtyZones')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <Label className="text-sm">Infrastructure</Label>
                    </div>
                    <Switch
                      checked={activeLayersState.infrastructure}
                      onCheckedChange={() => toggleLayer('infrastructure')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* View Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">View Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm">Current Phase</Label>
                    <Badge variant="outline" className="ml-2">
                      {phases.find(p => p.id === currentPhase)?.label}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>• Click and drag to rotate view</p>
                    <p>• Scroll to zoom in/out</p>
                    <p>• Right-click drag to pan</p>
                    <p>• Use AR/VR buttons for immersive view</p>
                    {!canUseXR && <p>• WebXR not supported on this device</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <div>
              <Label>Select Scenario</Label>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map(scenario => (
                    <SelectItem key={scenario.id} value={scenario.id}>
                      {scenario.name} - {scenario.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map(scenario => (
                <Card 
                  key={scenario.id}
                  className={`cursor-pointer transition-colors ${
                    selectedScenario === scenario.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-sm">{scenario.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-2">
                      {scenario.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Population: {scenario.population}</span>
                      <Badge variant="outline">{scenario.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};