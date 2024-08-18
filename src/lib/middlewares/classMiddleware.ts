import { AnyAction } from '@reduxjs/toolkit';
import { createTypedMiddleware } from './middlewareFactory';
import { updateCharacterInfo, addSkill } from '../characterSlice';
import { RootState } from '../store';
import { ClassSkills } from '../../types/game';

const classSkills: ClassSkills = {
  Fighter: ['Athletics', 'Intimidation', 'Survival'],
  Wizard: ['Arcana', 'History', 'Investigation'],
  Rogue: ['Acrobatics', 'Deception', 'Stealth'],
  Cleric: ['Medicine', 'Insight', 'Religion'],
};

export const classMiddleware = createTypedMiddleware<ReturnType<typeof updateCharacterInfo>>(
  'class',
  (action): action is ReturnType<typeof updateCharacterInfo> => updateCharacterInfo.match(action),
  (state: RootState, action: ReturnType<typeof updateCharacterInfo>) => {
    if (action.payload.class && classSkills[action.payload.class]) {
      const currentSkills = state.character.skills;
      const newSkills = classSkills[action.payload.class].filter(
        skill => !currentSkills.includes(skill)
      );
      
      newSkills.forEach(skill => {
        addSkill(skill);
      });
    }
  }
);