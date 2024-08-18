export interface Attributes {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  }
  
  export interface RaceModifiers {
    [key: string]: Partial<Attributes>;
  }
  
  export interface ClassSkills {
    [key: string]: string[];
  }
  
  export interface CharacterState {
    race: string;
    class: string;
    attributes: Attributes;
    skills: string[];
    health: number;
    mana: number;
  }