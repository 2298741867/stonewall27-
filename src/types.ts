export interface ObjectGroup {
  category: string;
  itemCountEstimate: number;
  impact: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
}

export interface Suggestion {
  id: string;
  title: string;
  zoneTag: string;
  priority: 'High' | 'Medium' | 'Low';
  timeEstimateMinutes: number;
  visualNoiseReductionPct: number;
  description: string;
  targetCoordinates: {
    x: number;
    y: number;
  };
  completed?: boolean;
}

export interface DeclutterStep {
  stepNumber: number;
  title: string;
  detail: string;
  estimatedMinutes: number;
  completed?: boolean;
}

export interface RoomScan {
  id: string;
  roomName: string;
  roomType: string;
  timestamp: string;
  imageUrl: string;
  clutterVolumeScore: number;
  efficiencyIndex: string;
  atmosphericShift: string;
  summary: string;
  objectGroups: ObjectGroup[];
  suggestions: Suggestion[];
  declutterSteps: DeclutterStep[];
  visionConceptPrompt: string;
  aiVisionImageUrl?: string;
}
