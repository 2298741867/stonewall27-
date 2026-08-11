import { RoomScan } from './types';

// Clean SVG room representations for sample rooms so they render crisp without external image loading failures
export const SAMPLE_ROOM_IMAGES = {
  librarySuite: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
  studioLiving: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
  masterCloset: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1000&q=80',
  kitchenIsland: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
};

export const INITIAL_SCANS: RoomScan[] = [
  {
    id: 'scan-01',
    roomName: 'The Library Suite',
    roomType: 'Home Office / Library',
    timestamp: '2026-08-11 14:00',
    imageUrl: SAMPLE_ROOM_IMAGES.librarySuite,
    clutterVolumeScore: 72,
    efficiencyIndex: '+12',
    atmosphericShift: 'Zen / Minimalist',
    summary: 'High paper stack density on primary desk surface with cable chaos in the lower right quadrant. Visual noise can be reduced by 45% through vertical book grouping and concealed cable routing.',
    objectGroups: [
      {
        category: 'Unorganized Paperwork & Mail',
        itemCountEstimate: 28,
        impact: 'High',
        recommendedAction: 'Consolidate into single archival box or binder.'
      },
      {
        category: 'Exposed Cable Assemblies',
        itemCountEstimate: 7,
        impact: 'High',
        recommendedAction: 'Route through under-desk conduit rail.'
      },
      {
        category: 'Misaligned Shelving Literature',
        itemCountEstimate: 42,
        impact: 'Medium',
        recommendedAction: 'Sort by spine height with 20% negative space.'
      },
      {
        category: 'Misc Desk Accessories',
        itemCountEstimate: 11,
        impact: 'Low',
        recommendedAction: 'Store inside desk drawer organizers.'
      }
    ],
    suggestions: [
      {
        id: 'sug-1',
        title: 'Relocate desk items to North elevation',
        zoneTag: 'Desk Surface',
        priority: 'High',
        timeEstimateMinutes: 10,
        visualNoiseReductionPct: 35,
        description: 'Clear the 60cm central workspace buffer. Move active notebooks and chargers into side drawer tier 1.',
        targetCoordinates: { x: 32, y: 45 }
      },
      {
        id: 'sug-2',
        title: 'Negative space utilization on shelf tier 2',
        zoneTag: 'Upper Shelving',
        priority: 'Medium',
        timeEstimateMinutes: 15,
        visualNoiseReductionPct: 20,
        description: 'Create architectural negative space by removing 3 paper stacks and leaving a clean 15cm margin on shelf ends.',
        targetCoordinates: { x: 75, y: 25 }
      },
      {
        id: 'sug-3',
        title: 'Cable bundle enclosure & concealment',
        zoneTag: 'Floor / Wall Junction',
        priority: 'High',
        timeEstimateMinutes: 12,
        visualNoiseReductionPct: 25,
        description: 'Enclose peripheral wires in black matte sleeve, securing behind desk leg for seamless silhouette.',
        targetCoordinates: { x: 20, y: 80 }
      }
    ],
    declutterSteps: [
      {
        stepNumber: 1,
        title: 'Clear Primary Desk Horizon',
        detail: 'Remove all non-essential items from the center 80cm of desk surface.',
        estimatedMinutes: 5,
        completed: false
      },
      {
        stepNumber: 2,
        title: 'Bundle Power & Data Lines',
        detail: 'Gather 5 loose power cables using velcro ties and attach to lower frame.',
        estimatedMinutes: 10,
        completed: false
      },
      {
        stepNumber: 3,
        title: 'Curate Open Bookcase Tiers',
        detail: 'Stack large hardcovers horizontally; leave upper tier 30% empty for air flow.',
        estimatedMinutes: 15,
        completed: false
      },
      {
        stepNumber: 4,
        title: 'Establish Drop Zone Tray',
        detail: 'Designate single matte ceramic tray for daily pocket contents.',
        estimatedMinutes: 5,
        completed: false
      }
    ],
    visionConceptPrompt: 'Architectural library suite with pristine dark oak desk, completely wire-free floor, neatly organized spine-aligned literature, ambient directional spotlighting, and spacious breathing room.'
  },
  {
    id: 'scan-02',
    roomName: 'Studio Living Quarters',
    roomType: 'Living Area',
    timestamp: '2026-08-10 18:30',
    imageUrl: SAMPLE_ROOM_IMAGES.studioLiving,
    clutterVolumeScore: 58,
    efficiencyIndex: '+18',
    atmosphericShift: 'Nordic Architectural',
    summary: 'Coffee table is overloaded with throw items and mugs. Seating geometry is sound but visual clutter obscures accent rug geometry.',
    objectGroups: [
      {
        category: 'Coffee Table Surface Overflow',
        itemCountEstimate: 14,
        impact: 'High',
        recommendedAction: 'Limit surface items to 1 tray and 1 object.'
      },
      {
        category: 'Scatter Pillows & Throws',
        itemCountEstimate: 6,
        impact: 'Medium',
        recommendedAction: 'Fold throws into storage ottoman.'
      }
    ],
    suggestions: [
      {
        id: 'sug-201',
        title: 'Consolidate coffee table surface',
        zoneTag: 'Central Zone',
        priority: 'High',
        timeEstimateMinutes: 5,
        visualNoiseReductionPct: 30,
        description: 'Move magazines and remotes into a single tray or under-table shelf.',
        targetCoordinates: { x: 50, y: 60 }
      }
    ],
    declutterSteps: [
      {
        stepNumber: 1,
        title: 'Reset Coffee Table',
        detail: 'Remove cups and paper mail.',
        estimatedMinutes: 5,
        completed: false
      }
    ],
    visionConceptPrompt: 'Minimal Scandinavian studio living room with clean oak floors, streamlined neutral couch, geometric coffee table tray, and zero floor clutter.'
  }
];
