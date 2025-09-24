import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, 
  Zap, 
  Satellite, 
  Users, 
  ArrowLeft, 
  Play, 
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import mitigationTech from "@/assets/mitigation-tech.jpg";

const Mitigation = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [missionBudget, setMissionBudget] = useState([5000]);
  const [timeToImpact, setTimeToImpact] = useState([24]);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonProgress, setComparisonProgress] = useState(0);

  const mitigationStrategies = [
    {
      id: "kinetic",
      name: "Kinetic Impactor",
      icon: Rocket,
      description: "High-velocity spacecraft collision to alter trajectory",
      cost: "$500M - $2B",
      timeRequired: "5-15 years",
      successRate: 85,
      riskLevel: "Low",
      pros: ["Proven technology", "No radioactive debris", "Precise targeting"],
      cons: ["Requires early detection", "Limited to smaller asteroids", "Single-shot mission"],
      color: "primary"
    },
    {
      id: "nuclear",
      name: "Nuclear Detonation",
      icon: Zap,
      description: "Nuclear explosive to fragment or deflect asteroid",
      cost: "$1B - $5B",
      timeRequired: "2-10 years",
      successRate: 95,
      riskLevel: "High",
      pros: ["Highest success rate", "Effective on large asteroids", "Rapid deployment possible"],
      cons: ["Radioactive debris risk", "International approval needed", "Fragmentation concerns"],
      color: "warning"
    },
    {
      id: "gravity",
      name: "Gravity Tractor",
      icon: Satellite,
      description: "Long-term gravitational influence using spacecraft",
      cost: "$200M - $800M",
      timeRequired: "10-50 years",
      successRate: 75,
      riskLevel: "Very Low",
      pros: ["Gentle deflection", "No contamination", "Continuous control"],
      cons: ["Extremely long lead time", "Limited effectiveness", "Requires stable orbit"],
      color: "accent"
    },
    {
      id: "evacuation",
      name: "Civil Evacuation",
      icon: Users,
      description: "Large-scale population relocation and sheltering",
      cost: "$50B - $200B",
      timeRequired: "1-5 years",
      successRate: 60,
      riskLevel: "Medium",
      pros: ["Guaranteed population safety", "No space mission risk", "Immediate implementation"],
      cons: ["Massive infrastructure impact", "Economic devastation", "Limited by logistics"],
      color: "destructive"
    }
  ];

  const handleRunComparison = () => {
    setIsComparing(true);
    setComparisonProgress(0);
    const interval = setInterval(() => {
      setComparisonProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComparing(false);
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  const selectedStrategyData = mitigationStrategies.find(s => s.id === selectedStrategy);

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
              <h1 className="text-xl font-orbitron font-bold">Mitigation Strategies</h1>
              <p className="text-sm text-muted-foreground">Asteroid Threat Mitigation Analysis</p>
            </div>
          </div>
          <Badge variant="outline" className="border-warning text-warning">
            <AlertTriangle className="h-3 w-3 mr-1" />
            T-minus {timeToImpact[0]} months
          </Badge>
        </div>
      </header>

      <div className="p-6">
        {/* Mission Parameters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Mission Parameters</CardTitle>
            <CardDescription>Adjust constraints to optimize mitigation strategy selection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Mission Budget: ${missionBudget[0]}M</Label>
                <Slider
                  value={missionBudget}
                  onValueChange={setMissionBudget}
                  max={10000}
                  min={100}
                  step={100}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Time to Impact: {timeToImpact[0]} months</Label>
                <Slider
                  value={timeToImpact}
                  onValueChange={setTimeToImpact}
                  max={120}
                  min={6}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {mitigationStrategies.map((strategy) => {
            const Icon = strategy.icon;
            const isSelected = selectedStrategy === strategy.id;
            const isAffordable = missionBudget[0] * 1000000 >= parseInt(strategy.cost.split('$')[1].split('M')[0]) * 1000000;
            const isTimeFeasible = timeToImpact[0] >= parseInt(strategy.timeRequired.split('-')[0]);
            
            return (
              <Card 
                key={strategy.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  isSelected ? 'border-primary shadow-glow' : ''
                } ${!isAffordable || !isTimeFeasible ? 'opacity-50' : ''}`}
                onClick={() => setSelectedStrategy(strategy.id)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto p-3 rounded-full bg-${strategy.color}/10`}>
                    <Icon className={`h-8 w-8 text-${strategy.color}`} />
                  </div>
                  <CardTitle className="text-lg">{strategy.name}</CardTitle>
                  <CardDescription className="text-sm">{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cost:</span>
                      <span className={!isAffordable ? 'text-destructive' : ''}>{strategy.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <span className={!isTimeFeasible ? 'text-destructive' : ''}>{strategy.timeRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="text-accent">{strategy.successRate}%</span>
                    </div>
                    <Badge 
                      variant={strategy.riskLevel === 'Low' ? 'default' : 
                              strategy.riskLevel === 'Medium' ? 'secondary' : 'destructive'}
                      className="w-full justify-center"
                    >
                      {strategy.riskLevel} Risk
                    </Badge>
                  </div>
                  {isSelected && (
                    <div className="mt-3 p-2 bg-primary/10 rounded flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Selected Strategy</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Strategy Details and Comparison */}
        {selectedStrategyData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strategy Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <selectedStrategyData.icon className="mr-2 h-5 w-5" />
                  {selectedStrategyData.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="pros-cons">Analysis</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{selectedStrategyData.cost}</div>
                          <div className="text-xs text-muted-foreground">Mission Cost</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{selectedStrategyData.timeRequired}</div>
                          <div className="text-xs text-muted-foreground">Development Time</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Success Probability</span>
                        <span className="text-sm font-medium">{selectedStrategyData.successRate}%</span>
                      </div>
                      <Progress value={selectedStrategyData.successRate} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pros-cons" className="space-y-4">
                    <div>
                      <h4 className="font-medium text-accent mb-2">Advantages</h4>
                      <ul className="space-y-1">
                        {selectedStrategyData.pros.map((pro, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <CheckCircle className="h-3 w-3 text-accent mt-1 mr-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-destructive mb-2">Disadvantages</h4>
                      <ul className="space-y-1">
                        {selectedStrategyData.cons.map((con, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <AlertTriangle className="h-3 w-3 text-destructive mt-1 mr-2 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="space-y-4">
                    <div className="relative h-48 bg-gradient-space rounded-lg overflow-hidden">
                      <img 
                        src={mitigationTech} 
                        alt="Mitigation Technology"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Technical specifications and deployment requirements for the {selectedStrategyData.name} approach.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Before/After Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Comparison</CardTitle>
                <CardDescription>Before vs After Mitigation Analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-destructive/10 rounded-lg">
                    <div className="text-2xl font-bold font-orbitron text-destructive">2.4M</div>
                    <div className="text-xs text-muted-foreground">Casualties (Before)</div>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold font-orbitron text-accent">
                      {selectedStrategyData.id === 'evacuation' ? '240K' : 
                       selectedStrategyData.id === 'nuclear' ? '1.8M' : '0'}
                    </div>
                    <div className="text-xs text-muted-foreground">Casualties (After)</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleRunComparison} 
                    className="w-full" 
                    disabled={isComparing}
                  >
                    {isComparing ? (
                      <>
                        <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                        Computing Comparison...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Run Comparison Analysis
                      </>
                    )}
                  </Button>

                  {isComparing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analysis Progress</span>
                        <span>{comparisonProgress}%</span>
                      </div>
                      <Progress value={comparisonProgress} />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Risk Reduction:</span>
                      <span className="text-accent font-medium">
                        {selectedStrategyData.successRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mission Complexity:</span>
                      <span className={`font-medium ${
                        selectedStrategyData.riskLevel === 'Low' ? 'text-accent' :
                        selectedStrategyData.riskLevel === 'Medium' ? 'text-warning' : 'text-destructive'
                      }`}>
                        {selectedStrategyData.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mitigation;