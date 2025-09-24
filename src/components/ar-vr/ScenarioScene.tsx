import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Text, 
  Box, 
  Sphere, 
  Plane,
  Html,
  Environment
} from "@react-three/drei";
import { Mesh, Group, Vector3, Color } from "three";
import { ScenarioData, ImpactPhase, Hotspot } from "./types";

interface ScenarioSceneProps {
  scenario: ScenarioData;
  phase: ImpactPhase;
  activeLayers: {
    damageRadius: boolean;
    evacuationPaths: boolean;
    casualtyZones: boolean;
    infrastructure: boolean;
  };
  asteroidParams: {
    size: number;
    speed: number;
    angle: number;
  };
}

const CityBuildings = ({ scenario, phase }: { scenario: ScenarioData; phase: ImpactPhase }) => {
  const groupRef = useRef<Group>(null);
  
  const buildings = useMemo(() => {
    const buildingData = [];
    const gridSize = 20;
    
    for (let x = -gridSize; x < gridSize; x += 2) {
      for (let z = -gridSize; z < gridSize; z += 2) {
        if (Math.random() > 0.3) {
          const height = Math.random() * 8 + 2;
          const damaged = phase === "aftermath" && 
            Math.sqrt(x * x + z * z) < 15 && 
            Math.random() > 0.4;
          
          buildingData.push({
            position: [x + Math.random() * 0.5, height / 2, z + Math.random() * 0.5] as [number, number, number],
            scale: [0.8 + Math.random() * 0.4, height, 0.8 + Math.random() * 0.4] as [number, number, number],
            damaged
          });
        }
      }
    }
    return buildingData;
  }, [phase]);

  return (
    <group ref={groupRef}>
      {buildings.map((building, index) => (
        <Box
          key={index}
          position={building.position}
          scale={building.scale}
          args={[1, 1, 1]}
        >
          <meshLambertMaterial 
            color={building.damaged ? "#4a4a4a" : scenario.type === "urban" ? "#8a8a8a" : "#6a6a6a"}
            transparent={building.damaged}
            opacity={building.damaged ? 0.6 : 1.0}
          />
        </Box>
      ))}
    </group>
  );
};

const DamageRadius = ({ phase, asteroidParams }: { phase: ImpactPhase; asteroidParams: any }) => {
  const radius = useMemo(() => {
    return (asteroidParams.size / 100) * (asteroidParams.speed / 10) * 5;
  }, [asteroidParams]);

  if (phase === "pre-impact") return null;

  return (
    <group>
      {/* Primary blast zone */}
      <Sphere args={[radius, 32, 16]} position={[0, 0.1, 0]}>
        <meshBasicMaterial 
          color="#ff0000" 
          transparent 
          opacity={phase === "impact" ? 0.3 : 0.15}
          wireframe
        />
      </Sphere>
      
      {/* Secondary damage zone */}
      <Sphere args={[radius * 1.5, 32, 16]} position={[0, 0.1, 0]}>
        <meshBasicMaterial 
          color="#ff8800" 
          transparent 
          opacity={0.1}
          wireframe
        />
      </Sphere>
    </group>
  );
};

const EvacuationPaths = ({ scenario }: { scenario: ScenarioData }) => {
  const paths = useMemo(() => {
    const pathData = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const startX = Math.cos(angle) * 5;
      const startZ = Math.sin(angle) * 5;
      const endX = Math.cos(angle) * 25;
      const endZ = Math.sin(angle) * 25;
      
      pathData.push([
        new Vector3(startX, 0.2, startZ),
        new Vector3(endX, 0.2, endZ)
      ]);
    }
    return pathData;
  }, []);

  return (
    <group>
      {paths.map((path, index) => {
        const direction = path[1].clone().sub(path[0]).normalize();
        const distance = path[0].distanceTo(path[1]);
        
        return (
          <Box
            key={index}
            position={[
              (path[0].x + path[1].x) / 2,
              0.2,
              (path[0].z + path[1].z) / 2
            ]}
            scale={[distance, 0.1, 0.5]}
            rotation={[0, Math.atan2(direction.x, direction.z), 0]}
          >
            <meshBasicMaterial color="#00ff00" transparent opacity={0.6} />
          </Box>
        );
      })}
    </group>
  );
};

const CasualtyZones = ({ phase }: { phase: ImpactPhase }) => {
  if (phase === "pre-impact") return null;

  const zones = [
    { radius: 5, color: "#ff0000", opacity: 0.3, height: 0.3 },
    { radius: 10, color: "#ff8800", opacity: 0.2, height: 0.25 },
    { radius: 15, color: "#ffff00", opacity: 0.1, height: 0.2 }
  ];

  return (
    <group>
      {zones.map((zone, index) => (
        <Sphere key={index} args={[zone.radius, 16, 8]} position={[0, zone.height, 0]}>
          <meshBasicMaterial 
            color={zone.color} 
            transparent 
            opacity={zone.opacity}
          />
        </Sphere>
      ))}
    </group>
  );
};

const ImpactAsteroid = ({ phase, asteroidParams }: { phase: ImpactPhase; asteroidParams: any }) => {
  const asteroidRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (asteroidRef.current && phase === "impact") {
      asteroidRef.current.rotation.x += 0.02;
      asteroidRef.current.rotation.y += 0.01;
    }
  });

  if (phase === "aftermath") return null;

  const size = asteroidParams.size / 200; // Scale for 3D scene
  const height = phase === "pre-impact" ? 50 : 1;

  return (
    <Sphere 
      ref={asteroidRef}
      args={[size, 16, 16]} 
      position={[0, height, 0]}
    >
      <meshLambertMaterial 
        color="#444444"
      />
    </Sphere>
  );
};

const HotspotMarkers = ({ hotspots, phase }: { hotspots: Hotspot[]; phase: ImpactPhase }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  return (
    <group>
      {hotspots.map((hotspot) => (
        <group key={hotspot.id} position={hotspot.position}>
          <Sphere 
            args={[0.5, 8, 8]}
            onClick={() => setSelectedHotspot(
              selectedHotspot === hotspot.id ? null : hotspot.id
            )}
          >
            <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
          </Sphere>
          
          {selectedHotspot === hotspot.id && (
            <Html
              position={[0, 2, 0]}
              center
              style={{
                pointerEvents: 'none'
              }}
            >
              <div className="bg-card border rounded-lg p-3 max-w-xs shadow-lg">
                <h4 className="font-semibold text-sm mb-1">{hotspot.title}</h4>
                <p className="text-xs text-muted-foreground">{hotspot.description}</p>
                {hotspot.data[phase] && (
                  <div className="mt-2 text-xs">
                    <strong>Current Phase:</strong> {hotspot.data[phase]}
                  </div>
                )}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
};

export const ScenarioScene: React.FC<ScenarioSceneProps> = ({
  scenario,
  phase,
  activeLayers,
  asteroidParams
}) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Ground Plane */}
      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshLambertMaterial 
          color={scenario.type === "coastal" ? "#4a90e2" : "#4a5d23"} 
        />
      </Plane>

      {/* City/Terrain */}
      {activeLayers.infrastructure && (
        <CityBuildings scenario={scenario} phase={phase} />
      )}

      {/* Asteroid */}
      <ImpactAsteroid phase={phase} asteroidParams={asteroidParams} />

      {/* Visualization Layers */}
      {activeLayers.damageRadius && (
        <DamageRadius phase={phase} asteroidParams={asteroidParams} />
      )}
      
      {activeLayers.evacuationPaths && (
        <EvacuationPaths scenario={scenario} />
      )}
      
      {activeLayers.casualtyZones && (
        <CasualtyZones phase={phase} />
      )}

      {/* Interactive Hotspots */}
      <HotspotMarkers hotspots={scenario.hotspots} phase={phase} />

      {/* Scene Title */}
      <Text
        position={[0, 25, 0]}
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {scenario.name} - {phase.replace('-', ' ').toUpperCase()}
      </Text>

      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={200}
        minDistance={10}
      />
    </>
  );
};