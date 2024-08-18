import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { smartLog } from './utils'; // Import smartLog from utils
import { EquipmentItem } from '../types/equipment'; // Import EquipmentItem type

// Define the structure for character attributes
export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

// Define the structure for character background
export interface Background {
  name: string;
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

// Define the overall character state structure
export interface CharacterState {
  name: string;
  race: string;
  class: string;
  attributes: Attributes;
  skills: string[];
  background: Background;
  level: number;
  health: number;
  mana: number;
  xp: number;
  equipment: EquipmentItem[]; // Changed from string[] to EquipmentItem[]
  attributePoints: number;
}

// Initial state for a new character
const initialState: CharacterState = {
  name: '',
  race: '',
  class: '',
  attributes: {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
  },
  skills: [],
  background: {
    name: '',
    personalityTraits: [],
    ideals: [],
    bonds: [],
    flaws: [],
  },
  level: 1,
  health: 0,
  mana: 0,
  xp: 0,
  equipment: [], // This is now an empty array of EquipmentItem
  attributePoints: 27, // Standard point-buy system
};

// Helper function to calculate point cost for attributes
function calculatePointCost(value: number): number {
  if (value <= 13) return value - 8;
  if (value === 14) return 7;
  if (value === 15) return 9;
  return 0; // Invalid value
}

// Create the character slice
const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    // Update multiple character properties at once
    updateCharacterInfo: (state, action: PayloadAction<Partial<CharacterState>>) => {
      Object.assign(state, action.payload);
      smartLog('Character info updated', action.payload);
    },
    // Update a single attribute
    updateAttribute: (state, action: PayloadAction<{ attribute: keyof Attributes; value: number }>) => {
      const { attribute, value } = action.payload;
      const oldValue = state.attributes[attribute];
      const pointDifference = calculatePointCost(value) - calculatePointCost(oldValue);
      
      if (state.attributePoints >= pointDifference) {
        state.attributes[attribute] = value;
        state.attributePoints -= pointDifference;
        smartLog(`Attribute ${attribute} updated`, { oldValue, newValue: value, remainingPoints: state.attributePoints });
      } else {
        smartLog(`Failed to update attribute ${attribute}`, { reason: 'Insufficient points' });
      }
    },
    // Add a new skill
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
        smartLog('Skill added', action.payload);
      } else {
        smartLog('Skill not added', { reason: 'Skill already exists', skill: action.payload });
      }
    },
    // Remove a skill
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(skill => skill !== action.payload);
      smartLog('Skill removed', action.payload);
    },
    // Update background information
    updateBackground: (state, action: PayloadAction<{ field: keyof Background; value: string | string[] }>) => {
      const { field, value } = action.payload;
      if (field === 'name') {
        state.background[field] = value as string;
      } else {
        state.background[field] = value as string[];
      }
      smartLog('Background updated', { field, value });
    },
    // Update equipment (replace the entire equipment array)
    updateEquipment: (state, action: PayloadAction<EquipmentItem[]>) => {
      state.equipment = action.payload;
      smartLog('Equipment updated', action.payload);
    },
    // Add a single equipment item
    addEquipment: (state, action: PayloadAction<EquipmentItem>) => {
      state.equipment.push(action.payload);
      smartLog('Equipment added', action.payload);
    },
    // Remove a single equipment item
    removeEquipment: (state, action: PayloadAction<string>) => {
      state.equipment = state.equipment.filter(item => item.id !== action.payload);
      smartLog('Equipment removed', action.payload);
    },
    // Level up the character
    levelUp: (state) => {
      state.level += 1;
      // Here you could add logic for increasing health, mana, etc.
      smartLog('Character leveled up', { newLevel: state.level });
    },
    // Gain experience points
    gainXP: (state, action: PayloadAction<number>) => {
      state.xp += action.payload;
      smartLog('XP gained', { amount: action.payload, totalXP: state.xp });
    },
  },
});

// Export action creators
export const {
  updateCharacterInfo,
  updateAttribute,
  addSkill,
  removeSkill,
  updateBackground,
  updateEquipment,
  addEquipment,
  removeEquipment,
  levelUp,
  gainXP,
} = characterSlice.actions;

// Export the reducer
export default characterSlice.reducer;