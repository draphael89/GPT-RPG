import { CharacterState } from '../lib/characterSlice';

export function validateCharacterStep(step: number, character: CharacterState): string[] {
  const errors: string[] = [];

  switch (step) {
    case 1:
      if (!character.name) errors.push('Name is required');
      if (!character.race) errors.push('Race is required');
      if (!character.class) errors.push('Class is required');
      break;
    case 2:
      if (character.attributePoints !== 0) errors.push('You must use all attribute points');
      Object.entries(character.attributes).forEach(([attr, value]) => {
        if (value < 8 || value > 15) errors.push(`${attr} must be between 8 and 15`);
      });
      break;
    case 3:
      if (character.skills.length < 2) errors.push('You must select at least 2 skills');
      break;
    case 4:
      if (!character.background.name) errors.push('Background name is required');
      if (character.background.personalityTraits.length === 0) errors.push('At least one personality trait is required');
      if (character.background.ideals.length === 0) errors.push('At least one ideal is required');
      if (character.background.bonds.length === 0) errors.push('At least one bond is required');
      if (character.background.flaws.length === 0) errors.push('At least one flaw is required');
      break;
    case 5:
      if (character.equipment.length === 0) errors.push('You must select at least one piece of equipment');
      break;
  }

  return errors;
}