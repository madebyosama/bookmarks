export type CategoryColor = {
  background: string;
  color: string;
};

export const categoryColors: Record<string, CategoryColor> = {
  Explore: { background: '#D6DEFE', color: '#0025E8' },
  Utility: { background: '#FDE49F', color: '#7A5E00' },
  Tool: { background: '#D4EDBC', color: '#2E6B00' },
  Productivity: { background: '#BFE1F6', color: '#004A70' },
  Resources: { background: '#FECEC8', color: '#912B2B' },
  Inspiration: { background: '#FDC7A9', color: '#8B4000' },
  Reading: { background: '#E6CFF2', color: '#4A2E6E' },
  Learning: { background: '#C8F0D4', color: '#1E6B3D' },
  AI: { background: '#D8D3FA', color: '#3B2E8C' },
  Collection: { background: '#C8ECF0', color: '#125E68' },
};

export const defaultCategoryColor: CategoryColor = {
  background: '#E5E5E5',
  color: '#333333',
};
