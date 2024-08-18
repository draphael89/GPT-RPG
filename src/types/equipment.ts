import { CharacterClass } from './character';
import getLogger from '../utils/logger';

const logger = getLogger();

/**
 * Represents the rarity of an equipment item.
 */
export enum EquipmentRarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  VeryRare = 'Very Rare',
  Legendary = 'Legendary',
}

/**
 * Represents the type of equipment.
 */
export enum EquipmentType {
  Weapon = 'Weapon',
  Armor = 'Armor',
  Potion = 'Potion',
  Scroll = 'Scroll',
  Wand = 'Wand',
  Ring = 'Ring',
  Miscellaneous = 'Miscellaneous',
}

/**
 * Represents an equipment item in the game.
 */
export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  weight?: number;
  value: number;
  classes: Set<CharacterClass | 'All'>; // Using Set for faster lookups
  type: EquipmentType;
  rarity: EquipmentRarity;
  magicalProperties?: string[];
  durability?: number;
}

/**
 * Represents the equipment loadout of a character.
 */
export interface CharacterEquipment {
  weapons: EquipmentItem[];
  armor: EquipmentItem[];
  accessories: EquipmentItem[];
  inventory: EquipmentItem[];
}

/**
 * Calculates the total weight of a character's equipment.
 * @param equipment - The character's equipment loadout.
 * @returns The total weight of all equipment items.
 */
export function calculateTotalEquipmentWeight(equipment: CharacterEquipment): number {
  logger.debug('Calculating total equipment weight');
  
  const totalWeight = Object.values(equipment).flat().reduce((acc, item) => acc + item.weight, 0);

  logger.debug('Total equipment weight calculated', { totalWeight });
  return totalWeight;
}

/**
 * Checks if an item is equippable by a specific character class.
 * @param item - The equipment item to check.
 * @param characterClass - The character class to check against.
 * @returns True if the item is equippable, false otherwise.
 */
export function isItemEquippableByClass(item: EquipmentItem, characterClass: CharacterClass): boolean {
  logger.debug('Checking if item is equippable by class', { itemName: item.name, characterClass });
  
  const isEquippable = item.classes.has(characterClass) || item.classes.has('All');
  
  logger.debug('Item equippability check result', { isEquippable });
  return isEquippable;
}

/**
 * Generates a string representation of an equipment item.
 * @param item - The equipment item to stringify.
 * @returns A string representation of the item.
 */
export function stringifyEquipmentItem(item: EquipmentItem): string {
  const magicalPropertiesString = item.magicalProperties 
    ? `Magical Properties: ${item.magicalProperties.join(', ')}. ` 
    : '';
  const durabilityString = item.durability !== undefined 
    ? `Durability: ${item.durability}. ` 
    : '';

  return `${item.name} (${item.type}, ${item.rarity}): ${item.description}. ` +
         `Value: ${item.value} gold, Weight: ${item.weight} lbs. ` +
         `${magicalPropertiesString}${durabilityString}` +
         `Usable by: ${Array.from(item.classes).join(', ')}.`;
}

/**
 * Creates a new EquipmentItem with default values for optional properties.
 * @param params - The parameters to create the EquipmentItem.
 * @returns A new EquipmentItem object.
 */
export function createEquipmentItem(params: Omit<EquipmentItem, 'magicalProperties' | 'durability'> & 
  Partial<Pick<EquipmentItem, 'magicalProperties' | 'durability'>>): EquipmentItem {
  logger.debug('Creating new equipment item', { itemName: params.name });
  
  const item: EquipmentItem = {
    ...params,
    magicalProperties: params.magicalProperties || [],
    durability: params.durability !== undefined ? params.durability : 100
  };

  logger.debug('New equipment item created', { item });
  return item;
}

// Export a namespace with all equipment-related types and functions
export const Equipment = {
  EquipmentRarity,
  EquipmentType,
  calculateTotalEquipmentWeight,
  isItemEquippableByClass,
  stringifyEquipmentItem,
  createEquipmentItem,
};

// Log that the equipment module has been loaded
logger.debug('Equipment types and utilities loaded');