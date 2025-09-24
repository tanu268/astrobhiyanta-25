import { ScenarioData } from "./types";

export const scenarios: ScenarioData[] = [
  {
    id: "urban-nyc",
    name: "New York City",
    description: "Dense urban area with skyscrapers and high population",
    type: "urban",
    population: "8.4M",
    coordinates: [40.7128, -74.0060],
    hotspots: [
      {
        id: "ground-zero",
        title: "Ground Zero",
        description: "Primary impact site with complete destruction",
        position: [0, 1, 0],
        data: {
          "pre-impact": "Target zone - immediate evacuation required",
          "impact": "Complete vaporization within 2km radius",
          "aftermath": "Crater formation, extreme radiation"
        }
      },
      {
        id: "manhattan-bridge",
        title: "Manhattan Bridge",
        description: "Critical evacuation route infrastructure",
        position: [8, 2, -5],
        data: {
          "pre-impact": "Primary evacuation route - keep clear",
          "impact": "Severe structural damage from shockwave",
          "aftermath": "Bridge collapse, alternative routes needed"
        }
      },
      {
        id: "hospital-complex",
        title: "Hospital Complex",
        description: "Emergency medical facilities",
        position: [-6, 1, 8],
        data: {
          "pre-impact": "Emergency staging area for wounded",
          "impact": "Building damage, equipment failure",
          "aftermath": "Overwhelmed with casualties, needs reinforcement"
        }
      },
      {
        id: "central-park",
        title: "Central Park",
        description: "Open area for emergency staging",
        position: [0, 0, 15],
        data: {
          "pre-impact": "Designated safe zone and gathering point",
          "impact": "Trees destroyed, but open space intact",
          "aftermath": "Temporary refugee camp, aid distribution"
        }
      }
    ],
    assets: {
      terrain: "/models/nyc-terrain.glb",
      buildings: "/models/nyc-buildings.glb",
      textures: ["/textures/urban-ground.jpg", "/textures/concrete.jpg"]
    }
  },
  {
    id: "coastal-miami",
    name: "Miami Beach",
    description: "Coastal city with tsunami risk and beach infrastructure",
    type: "coastal",
    population: "2.7M",
    coordinates: [25.7617, -80.1918],
    hotspots: [
      {
        id: "impact-site",
        title: "Ocean Impact Site",
        description: "Asteroid hits offshore, generating massive tsunami",
        position: [0, 0, -20],
        data: {
          "pre-impact": "Impact trajectory towards ocean",
          "impact": "Massive water displacement, tsunami generation",
          "aftermath": "Ongoing tsunami waves, coastal flooding"
        }
      },
      {
        id: "beach-hotels",
        title: "Beachfront Hotels",
        description: "High-rise hotels directly facing impact zone",
        position: [5, 3, 0],
        data: {
          "pre-impact": "Immediate evacuation of beachfront properties",
          "impact": "Direct tsunami impact, building collapse",
          "aftermath": "Complete destruction, debris field"
        }
      },
      {
        id: "evacuation-highway",
        title: "I-95 Evacuation Route",
        description: "Major highway for inland evacuation",
        position: [0, 1, 25],
        data: {
          "pre-impact": "Mass evacuation route - traffic management critical",
          "impact": "Heavy congestion, some bridge damage",
          "aftermath": "Continued refugee movement, fuel shortages"
        }
      },
      {
        id: "port-miami",
        title: "Port of Miami",
        description: "Critical infrastructure for emergency supplies",
        position: [-10, 1, 5],
        data: {
          "pre-impact": "Securing ships, preparing for tsunami",
          "impact": "Port facilities destroyed, ships damaged",
          "aftermath": "Harbor unusable, alternative ports needed"
        }
      }
    ],
    assets: {
      terrain: "/models/miami-terrain.glb",
      buildings: "/models/miami-buildings.glb",
      textures: ["/textures/sand.jpg", "/textures/water.jpg"]
    }
  },
  {
    id: "industrial-houston",
    name: "Houston Industrial Zone",
    description: "Chemical plants and refineries with hazardous materials",
    type: "industrial",
    population: "4.9M",
    coordinates: [29.7604, -95.3698],
    hotspots: [
      {
        id: "refinery-complex",
        title: "Petrochemical Refinery",
        description: "Major chemical processing facility",
        position: [-8, 2, -3],
        data: {
          "pre-impact": "Emergency shutdown procedures initiated",
          "impact": "Secondary explosions, toxic gas release",
          "aftermath": "Ongoing chemical fires, evacuation zone expanded"
        }
      },
      {
        id: "chemical-storage",
        title: "Chemical Storage Tanks",
        description: "Large-scale hazardous material storage",
        position: [6, 1, 8],
        data: {
          "pre-impact": "Securing containment systems",
          "impact": "Tank ruptures, chemical spills",
          "aftermath": "Environmental contamination, long-term health risks"
        }
      },
      {
        id: "ship-channel",
        title: "Houston Ship Channel",
        description: "Major shipping route and port facilities",
        position: [0, 0, -15],
        data: {
          "pre-impact": "Vessels seeking safe harbor",
          "impact": "Channel blockage, facility damage",
          "aftermath": "Economic disruption, supply chain issues"
        }
      }
    ],
    assets: {
      terrain: "/models/houston-terrain.glb",
      buildings: "/models/industrial-complex.glb",
      textures: ["/textures/industrial.jpg", "/textures/metal.jpg"]
    }
  },
  {
    id: "rural-kansas",
    name: "Rural Kansas",
    description: "Agricultural area with widespread farming communities",
    type: "rural",
    population: "125K",
    coordinates: [39.0119, -98.4842],
    hotspots: [
      {
        id: "farmland-center",
        title: "Agricultural Center",
        description: "Primary farming and livestock area",
        position: [0, 0, 0],
        data: {
          "pre-impact": "Livestock evacuation, crop protection",
          "impact": "Widespread agricultural destruction",
          "aftermath": "Food supply disruption, economic impact"
        }
      },
      {
        id: "grain-silos",
        title: "Grain Storage Facility",
        description: "Regional food storage and distribution",
        position: [12, 2, -8],
        data: {
          "pre-impact": "Securing grain supplies",
          "impact": "Silo damage, grain loss",
          "aftermath": "Regional food shortage concerns"
        }
      },
      {
        id: "rural-highway",
        title: "Rural Highway Network",
        description: "Limited evacuation routes through farmland",
        position: [0, 0, 20],
        data: {
          "pre-impact": "Coordinating rural population evacuation",
          "impact": "Road damage, limited alternate routes",
          "aftermath": "Isolated communities, supply challenges"
        }
      }
    ],
    assets: {
      terrain: "/models/rural-terrain.glb",
      buildings: "/models/farm-buildings.glb",
      textures: ["/textures/farmland.jpg", "/textures/grass.jpg"]
    }
  }
];