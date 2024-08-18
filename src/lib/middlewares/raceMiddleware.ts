import { Middleware } from 'redux';
import { RootState } from '../store';
import { updateCharacterInfo, updateAttribute } from '../characterSlice';
import { RaceModifiers, Attributes, CharacterState } from '../../types/game';

const raceModifiers: RaceModifiers = {
  Human: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
  Elf: { dexterity: 2, intelligence: 1 },
  Dwarf: { constitution: 2, wisdom: 1 },
  Halfling: { dexterity: 2, charisma: 1 },
};

export const raceMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);

  if (updateCharacterInfo.match(action) && action.payload.race) {
    const state = store.getState().character;
    const newRace = action.payload.race;
    
    if (raceModifiers[newRace]) {
      const modifiers = raceModifiers[newRace];
      Object.entries(modifiers).forEach(([attr, mod]) => {
        const attribute = attr as keyof Attributes;
        const currentValue = state.attributes[attribute];
        if (typeof mod === 'number' && typeof currentValue === 'number') {
          store.dispatch(updateAttribute({ attribute, value: currentValue + mod }));
        }
      });
    }
  }

  return result;
};