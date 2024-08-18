import getLogger from '../utils/logger';

const logger = getLogger();

/**
 * Represents the available character classes in the game.
 */
export type CharacterClass = 'Fighter' | 'Wizard' | 'Rogue' | 'Cleric' | 'Paladin' | 'Ranger' | 'Sorcerer';

/**
 * Represents the available character races in the game.
 */
export type CharacterRace = 'Human' | 'Elf' | 'Dwarf' | 'Halfling' | 'Gnome' | 'Half-Elf' | 'Half-Orc';

/**
 * Represents the character's attributes.
 */
export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

/**
 * Represents the character's background information.
 */
export interface Background {
  name: string;
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

/**
 * Represents the full state of a character.
 */
export interface CharacterState {
  name: string;
  race: CharacterRace;
  class: CharacterClass;
  attributes: Attributes;
  skills: Set<string>; // Using Set for efficient lookup and uniqueness
  background: Background;
  level: number;
  health: number;
  mana: number;
  xp: number;
  equipment: string[];
}

/**
 * Creates a new character with default values.
 * @param name - The name of the character.
 * @param race - The race of the character.
 * @param characterClass - The class of the character.
 * @returns A new CharacterState object with default values.
 */
export function createNewCharacter(name: string, race: CharacterRace, characterClass: CharacterClass): CharacterState {
  logger.debug('Creating new character', { name, race, class: characterClass });
  
  const newCharacter: CharacterState = {
    name,
    race,
    class: characterClass,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    skills: new Set(),
    background: {
      name: '',
      personalityTraits: [],
      ideals: [],
      bonds: [],
      flaws: []
    },
    level: 1,
    health: 10,
    mana: 10,
    xp: 0,
    equipment: []
  };

  logger.debug('New character created', { characterId: name });
  return newCharacter;
}

/**
 * Calculates the modifier for a given attribute score.
 * @param score - The attribute score.
 * @returns The calculated modifier.
 */
export function calculateAttributeModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Validates a CharacterState object.
 * @param character - The character state to validate.
 * @returns An array of error messages, or an empty array if valid.
 */
export function validateCharacter(character: CharacterState): string[] {
  const errors: string[] = [];

  if (!character.name) errors.push('Character name is required');
  if (!character.race) errors.push('Character race is required');
  if (!character.class) errors.push('Character class is required');
  
  // Validate attributes
  Object.entries(character.attributes).forEach(([attr, value]) => {
    if (value < 3 || value > 18) errors.push(`${attr} must be between 3 and 18`);
  });

  // Validate skills
  if (character.skills.size < 2) errors.push('Character must have at least 2 skills');

  // Validate background
  if (!character.background.name) errors.push('Background name is required');
  if (character.background.personalityTraits.length === 0) errors.push('At least one personality trait is required');
  if (character.background.ideals.length === 0) errors.push('At least one ideal is required');
  if (character.background.bonds.length === 0) errors.push('At least one bond is required');
  if (character.background.flaws.length === 0) errors.push('At least one flaw is required');

  logger.debug('Character validation complete', { 
    characterId: character.name, 
    isValid: errors.length === 0, 
    errorCount: errors.length 
  });

  return errors;
}

// Export a namespace with all character-related types and functions
export const Character = {
  createNewCharacter,
  calculateAttributeModifier,
  validateCharacter
};

// Log that the character module has been loaded
logger.debug('Character types and utilities loaded');