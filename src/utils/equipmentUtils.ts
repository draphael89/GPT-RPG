import { EquipmentItem, EquipmentType, EquipmentRarity } from '../types/equipment';
import { CharacterClass } from '../types/character';
import getLogger from './logger';

const logger = getLogger();

/**
 * Custom error class for equipment-related errors
 */
class EquipmentError extends Error {
  constructor(message: string, public context: Record<string, unknown>) {
    super(message);
    this.name = 'EquipmentError';
  }
}

// Mock database of equipment items
// In a real application, this would be fetched from a database or API
const equipmentDatabase: EquipmentItem[] = [
  { id: '1', name: 'Sword', description: 'A sharp blade for melee combat', weight: 3, value: 15, classes: new Set(['Fighter', 'Paladin'] as (CharacterClass | 'All')[]), type: EquipmentType.Weapon, rarity: EquipmentRarity.Common },
  { id: '2', name: 'Staff', description: 'A magical focus for spellcasting', weight: 2, value: 10, classes: new Set(['Wizard', 'Sorcerer'] as (CharacterClass | 'All')[]), type: EquipmentType.Weapon, rarity: EquipmentRarity.Common },
  { id: '3', name: 'Bow', description: 'A ranged weapon for precise attacks', weight: 2, value: 25, classes: new Set(['Ranger', 'Rogue'] as (CharacterClass | 'All')[]), type: EquipmentType.Weapon, rarity: EquipmentRarity.Common },
  { id: '4', name: 'Shield', description: 'Protective gear to block attacks', weight: 6, value: 10, classes: new Set(['Fighter', 'Paladin', 'Cleric'] as (CharacterClass | 'All')[]), type: EquipmentType.Armor, rarity: EquipmentRarity.Common },
  { id: '5', name: 'Healing Potion', description: 'Restores health when consumed', weight: 0.5, value: 50, classes: new Set(['All'] as (CharacterClass | 'All')[]), type: EquipmentType.Potion, rarity: EquipmentRarity.Common },
];

// Pre-compute equipment by class for faster lookups
const equipmentByClass: Record<CharacterClass | 'All', EquipmentItem[]> = {
  Fighter: [],
  Wizard: [],
  Rogue: [],
  Cleric: [],
  Paladin: [],
  Ranger: [],
  Sorcerer: [],
  All: [],
};

equipmentDatabase.forEach(item => {
  item.classes.forEach(cls => {
    if (cls === 'All') {
      Object.values(equipmentByClass).forEach(classEquipment => classEquipment.push(item));
    } else {
      equipmentByClass[cls as CharacterClass].push(item);
    }
  });
});

/**
 * Fetches equipment items based on the character's class.
 * @param characterClass - The class of the character.
 * @returns A Promise that resolves to an array of EquipmentItem objects.
 */
export const getEquipmentByClass = async (characterClass: CharacterClass): Promise<EquipmentItem[]> => {
  logger.debug('Fetching equipment for class', { characterClass });
  
  try {
    // Simulate an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const classEquipment = [...equipmentByClass[characterClass], ...equipmentByClass['All']];
    
    logger.debug('Equipment fetched successfully', { 
      characterClass, 
      itemCount: classEquipment.length 
    });
    
    return classEquipment;
  } catch (error) {
    logger.error('Error fetching equipment', { characterClass, error });
    throw new EquipmentError('Failed to fetch equipment', { characterClass });
  }
};

/**
 * Calculates the total weight of the given equipment items.
 * @param equipment - An array of EquipmentItem objects.
 * @returns The total weight of the equipment.
 */
export const calculateEquipmentWeight = (equipment: EquipmentItem[]): number => {
  logger.debug('Calculating equipment weight', { equipmentCount: equipment.length });
  
  const totalWeight = equipment.reduce((acc, item) => {
    if (typeof item.weight === 'number') {
      return acc + item.weight;
    }
    logger.error('Equipment weight is not a number', { itemName: item.name });
    return acc;
  }, 0);
  
  logger.debug('Equipment weight calculated', { totalWeight });
  return totalWeight;
};

/**
 * Calculates the total value of the given equipment items.
 * @param equipment - An array of EquipmentItem objects.
 * @returns The total value of the equipment.
 */
export const calculateEquipmentValue = (equipment: EquipmentItem[]): number => {
  logger.debug('Calculating equipment value', { equipmentCount: equipment.length });
  
  const totalValue = equipment.reduce((acc, item) => {
    if (typeof item.value === 'number') {
      return acc + item.value;
    }
    logger.error('Equipment value is not a number', { itemName: item.name });
    return acc;
  }, 0);
  
  logger.debug('Equipment value calculated', { totalValue });
  return totalValue;
};

/**
 * Checks if a character can equip a specific item based on their class.
 * @param item - The EquipmentItem to check.
 * @param characterClass - The class of the character.
 * @returns A boolean indicating whether the character can equip the item.
 */
export const canEquipItem = (item: EquipmentItem, characterClass: CharacterClass): boolean => {
  logger.debug('Checking if character can equip item', { itemName: item.name, characterClass });
  
  const canEquip = item.classes.has(characterClass as CharacterClass | 'All') || item.classes.has('All');
  logger.debug('Equipment check result', { itemName: item.name, characterClass, canEquip });
  
  return canEquip;
};

/**
 * Finds an equipment item by its name.
 * @param itemName - The name of the item to find.
 * @returns The EquipmentItem if found, or undefined if not found.
 */
export const findEquipmentByName = (itemName: string): EquipmentItem | undefined => {
  return equipmentDatabase.find(item => item.name === itemName);
};

// Named export for the equipment utilities
export const equipmentUtils = {
  getEquipmentByClass,
  calculateEquipmentWeight,
  calculateEquipmentValue,
  canEquipItem,
  findEquipmentByName,
};

// Default export
export default equipmentUtils;