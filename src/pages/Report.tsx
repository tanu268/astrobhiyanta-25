import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Satellite,
  Target,
  AlertTriangle,
  Download,
  Play,
  Settings,
  Globe,
  Calculator,
  Users,
  DollarSign,
  Building,
  LogOut,
  Clock,
  Shield,
  Zap,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";
import impactSimulation from "@/assets/impact-simulation.jpg";
import missionControl from "@/assets/mission-control.jpg";

const Report = () => {
  const [warningLeadTime, setWarningLeadTime] = useState([8]);
  const [evacuationStartTime, setEvacuationStartTime] = useState("6");
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [countdown, setCountdown] = useState(11 * 24 * 60 * 60 + 14 * 60 * 60 + 32 * 60); // 11 days, 14 hours, 32 minutes
  const [mapLayer, setMapLayer] = useState("population");
  const [isGeneratingRoutes, setIsGeneratingRoutes] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Route generation simulation
  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    if (isGeneratingRoutes) {
      progressTimer = setInterval(() => {
        setSimulationProgress(prev => {
          if (prev >= 100) {
            setIsGeneratingRoutes(false);
            return 100;
          }
          return prev + 3;
        });
      }, 120);
    }

    return () => {
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isGeneratingRoutes]);

  const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const calculateCasualties = () => {
    const baseCount = 1680000;
    const reductionFactor = warningLeadTime[0] * 0.18;
    return Math.max(120000, Math.floor(baseCount * (1 - reductionFactor)));
  };

  const calculateEconomicLoss = () => {
    const baseLoss = 620;
    const reductionFactor = warningLeadTime[0] * 0.14;
    return Math.max(150, Math.floor(baseLoss * (1 - reductionFactor)));
  };

  const calculateInfrastructureDamage = () => {
    const baseDamage = 78;
    const reductionFactor = warningLeadTime[0] * 0.1;
    return Math.max(35, Math.floor(baseDamage * (1 - reductionFactor)));
  };

  const handleGenerateRoutes = () => {
    setIsGeneratingRoutes(true);
    setSimulationProgress(0);
  };

  const handleExport = (type: string) => {
    console.log(`Exporting ${type} report...`);
  };

  const handleRequestAIAnalysis = () => {
    setIsLoadingAI(true);
    setTimeout(() => {
      setAiRecommendations([
        "Immediate evacuation required for coastal zones within 12km radius",
        "Deploy 850 emergency personnel to high-density population areas",
        "Activate backup power grids for critical infrastructure in zones 4-7",
        "Establish 6 temporary medical stations with trauma capacity"
      ]);
      setIsLoadingAI(false);
    }, 2500);
  };

  const safeZones = [
    { name: "Highland Emergency Center", distance: "18.5km", time: "22 min" },
    { name: "Northwest Evacuation Hub", distance: "24.1km", time: "31 min" },
    { name: "Central Relief Station", distance: "15.8km", time: "19 min" },
    { name: "Mountain Ridge Shelter", distance: "32.4km", time: "41 min" }
  ];

  const getImpactTimelineProgress = () => {
    const totalSeconds = 14 * 24 * 60 * 60; // 14 days total
    const elapsed = totalSeconds - countdown;
    return Math.max(0, Math.min(100, (elapsed / totalSeconds) * 100));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Top Navigation */}
      <header className="relative z-10 border-b border-gray-800 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Satellite className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">
              Astro<span className="text-cyan-400">Bhiyanta</span>
            </h1>
            <Badge className="bg-red-600/20 text-red-400 border-red-500/50">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Decision Support
            </Badge>
          </div>
          <Link to="/">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* Left Column - Interactive Analysis */}
          <div className="lg:col-span-7">
            <Card className="bg-gray-900/50 border border-cyan-500/30 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-cyan-400 text-xl flex items-center">
                  <Target className="h-6 w-6 mr-3 text-cyan-400" />
                  Strategic Impact Analysis
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Comprehensive risk assessment and response planning dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="risk-maps" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border border-gray-700">
                    <TabsTrigger value="risk-maps" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-gray-300">Risk Maps</TabsTrigger>
                    <TabsTrigger value="casualties" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-gray-300">Casualties</TabsTrigger>
                    <TabsTrigger value="evacuation" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-gray-300">Evacuation</TabsTrigger>
                    <TabsTrigger value="reports" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-gray-300">Reports</TabsTrigger>
                    <TabsTrigger value="ai-insights" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-gray-300">AI Insights</TabsTrigger>
                  </TabsList>

                  {/* Risk Maps Tab */}
                  <TabsContent value="risk-maps" className="space-y-6 mt-6">
                    <div className="relative rounded-lg overflow-hidden border border-red-500/30">
                      <img 
                        src={impactSimulation} 
                        alt="3D Impact Visualization"
                        className="w-full h-72 object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Impact Data Overlay */}
                      <div className="absolute top-4 right-4 space-y-2">
                        <Card className="bg-black/80 border border-orange-500/50 backdrop-blur-sm">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-gray-300 text-sm">Blast Radius:</span>
                              <span className="font-mono text-orange-400 font-bold">18.7 km</span>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-gray-300 text-sm">Seismic Magnitude:</span>
                              <span className="font-mono text-red-400 font-bold">8.9 Mw</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm">Tsunami Risk:</span>
                              <Badge className="bg-red-600/20 text-red-400 border-red-500/50 text-xs">EXTREME</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/50">
                          <Zap className="h-3 w-3 mr-1" />
                          3D Impact Simulation Active
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-gray-300 text-base font-medium">Overlay Layer Selection</Label>
                      <Select value={mapLayer} onValueChange={setMapLayer}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="population">Population Density Heatmap</SelectItem>
                          <SelectItem value="hospitals">Medical Facilities & Hospitals</SelectItem>
                          <SelectItem value="power">Critical Power Grid Infrastructure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  {/* Casualties Tab */}
                  <TabsContent value="casualties" className="space-y-6 mt-6">
                    <div className="bg-gray-800/30 rounded-lg p-4 border border-yellow-500/20">
                      <h3 className="text-cyan-400 text-lg font-semibold mb-4 flex items-center">
                        <Calculator className="h-5 w-5 mr-2" />
                        Real-Time Impact Calculator
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="bg-gray-900/70 border border-red-500/30">
                          <CardContent className="p-4 text-center">
                            <Users className="h-10 w-10 text-red-400 mx-auto mb-3" />
                            <p className="text-gray-300 text-sm mb-1">Estimated Casualties</p>
                            <p className="font-mono text-2xl text-red-400 font-bold">{calculateCasualties().toLocaleString()}</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-900/70 border border-yellow-500/30">
                          <CardContent className="p-4 text-center">
                            <DollarSign className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                            <p className="text-gray-300 text-sm mb-1">Economic Impact</p>
                            <p className="font-mono text-2xl text-yellow-400 font-bold">${calculateEconomicLoss()}B</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-900/70 border border-orange-500/30">
                          <CardContent className="p-4 text-center">
                            <Building className="h-10 w-10 text-orange-400 mx-auto mb-3" />
                            <p className="text-gray-300 text-sm mb-1">Infrastructure Damage</p>
                            <p className="font-mono text-2xl text-orange-400 font-bold">{calculateInfrastructureDamage()}%</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-gray-300 text-base">Warning Lead Time</Label>
                          <span className="font-mono text-cyan-400 text-lg font-bold">{warningLeadTime[0]} hours</span>
                        </div>
                        <Slider
                          value={warningLeadTime}
                          onValueChange={setWarningLeadTime}
                          max={72}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 bg-gray-800/50 p-2 rounded">
                          💡 Increasing warning lead time significantly reduces casualties and economic impact
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Evacuation Tab */}
                  <TabsContent value="evacuation" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label className="text-gray-300 text-base font-medium">Evacuation Timing</Label>
                        <Input
                          type="number"
                          value={evacuationStartTime}
                          onChange={(e) => setEvacuationStartTime(e.target.value)}
                          className="bg-gray-800/50 border-gray-700 text-white h-12 text-lg"
                          min="1"
                          max="72"
                          placeholder="Hours before impact"
                        />
                        <p className="text-xs text-gray-500">Recommended: 6-12 hours minimum</p>
                      </div>
                      
                      <div className="space-y-4">
                        <Label className="text-gray-300 text-base font-medium">Route Optimization</Label>
                        <Button
                          onClick={handleGenerateRoutes}
                          disabled={isGeneratingRoutes}
                          className="w-full bg-cyan-600 hover:bg-cyan-700 h-12 text-base"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          {isGeneratingRoutes ? "Computing Routes..." : "Generate Optimized Routes"}
                        </Button>
                      </div>
                    </div>
                    
                    {(isGeneratingRoutes || simulationProgress > 0) && (
                      <div className="space-y-3 bg-gray-800/30 p-4 rounded-lg border border-cyan-500/20">
                        <div className="flex justify-between items-center">
                          <Label className="text-gray-300">AI Route Computation Progress</Label>
                          <span className="font-mono text-cyan-400 text-lg">{simulationProgress}%</span>
                        </div>
                        <Progress value={simulationProgress} className="w-full h-3" />
                      </div>
                    )}

                    {simulationProgress === 100 && (
                      <div className="space-y-3">
                        <h4 className="text-cyan-400 font-semibold">Recommended Safe Zones</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {safeZones.map((zone, index) => (
                            <Card key={index} className="bg-gray-800/50 border border-green-500/30">
                              <CardContent className="p-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-white font-medium">{zone.name}</p>
                                    <p className="text-gray-400 text-sm">{zone.distance} • {zone.time}</p>
                                  </div>
                                  <Shield className="h-5 w-5 text-green-400" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Reports Tab */}
                  <TabsContent value="reports" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        onClick={() => handleExport("PDF")}
                        className="bg-red-600 hover:bg-red-700 h-14 text-base"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Emergency PDF Report
                      </Button>
                      
                      <Button
                        onClick={() => handleExport("CSV")}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white h-14 text-base"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Export All Data (CSV)
                      </Button>
                      
                      <Link to="/awareness">
                        <Button
                          variant="outline"
                          className="w-full border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white h-14 text-base"
                        >
                          <Globe className="h-5 w-5 mr-2" />
                          Share Public Version
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Last Updated:</span>
                        <span className="text-cyan-400 font-mono">{new Date().toLocaleString()}</span>
                      </div>
                    </div>
                  </TabsContent>

                  {/* AI Insights Tab */}
                  <TabsContent value="ai-insights" className="space-y-6 mt-6">
                    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-lg border border-purple-500/30">
                      <h3 className="text-cyan-400 text-lg font-semibold mb-4 flex items-center">
                        <Brain className="h-6 w-6 mr-2 text-purple-400" />
                        AI-Powered Risk Analysis
                      </h3>
                      
                      {aiRecommendations.length === 0 && !isLoadingAI && (
                        <div className="text-center py-8">
                          <Button
                            onClick={handleRequestAIAnalysis}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                          >
                            <Calculator className="h-5 w-5 mr-2" />
                            Request Detailed AI Analysis
                          </Button>
                          <p className="text-gray-400 text-sm mt-2">Generate comprehensive risk assessment and recommendations</p>
                        </div>
                      )}

                      {isLoadingAI && (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-4"></div>
                          <p className="text-purple-400">AI analyzing current threat parameters...</p>
                        </div>
                      )}

                      {aiRecommendations.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-white font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                            Priority Recommendations
                          </h4>
                          <div className="space-y-3">
                            {aiRecommendations.map((recommendation, index) => (
                              <div key={index} className="bg-gray-800/50 p-3 rounded border-l-4 border-purple-500">
                                <p className="text-gray-200">{recommendation}</p>
                              </div>
                            ))}
                          </div>
                          <div className="pt-4 border-t border-gray-700">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-400">Confidence Score:</span>
                              <span className="text-green-400 font-mono">94.7%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status & Quick Actions */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Current Status */}
            <Card className="bg-gray-900/50 border border-red-500/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-400 flex items-center text-lg">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Current Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Threat Level:</span>
                    <Badge className="bg-red-600/20 text-red-400 border-red-500/50 px-3 py-1">EXTREME</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Impact ETA:</span>
                    <span className="font-mono text-red-400 text-lg font-bold">{formatCountdown(countdown)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Agencies:</span>
                    <span className="text-cyan-400 font-bold">18</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decision Brief */}
            <Card className="bg-gray-900/50 border border-cyan-500/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-400 flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2" />
                  Decision Brief
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">• Mandatory evacuation zones activated</p>
                  <p className="text-gray-300">• Emergency services on high alert</p>
                  <p className="text-gray-300">• International aid coordination initiated</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Impact Timeline:</span>
                    <span className="text-cyan-400">{Math.round(getImpactTimelineProgress())}% elapsed</span>
                  </div>
                  <Progress value={getImpactTimelineProgress()} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border border-yellow-500/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-yellow-400 flex items-center text-lg">
                  <Settings className="h-5 w-5 mr-2" />
                  Emergency Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => handleExport("PDF")}
                  className="w-full bg-red-600 hover:bg-red-700 h-12"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Emergency PDF Report
                </Button>
                
                <Button
                  onClick={() => handleExport("CSV")}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white h-12"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
                
                <Link to="/mitigation" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white h-12"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    View Mitigation Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;