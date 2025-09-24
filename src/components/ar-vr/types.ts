export type ImpactPhase = "pre-impact" | "impact" | "aftermath";

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  data: {
    [key in ImpactPhase]?: string;
  };
}

export interface ScenarioData {
  id: string;
  name: string;
  description: string;
  type: "urban" | "coastal" | "rural" | "industrial";
  population: string;
  coordinates: [number, number];
  hotspots: Hotspot[];
  assets: {
    terrain?: string;
    buildings?: string;
    textures?: string[];
  };
}

export interface AsteroidParameters {
  size: number;
  speed: number;
  angle: number;
}

export interface LayerState {
  damageRadius: boolean;
  evacuationPaths: boolean;
  casualtyZones: boolean;
  infrastructure: boolean;
}