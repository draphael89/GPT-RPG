import { Store, Middleware as ReduxMiddleware, Action as ReduxAction, Dispatch } from '@reduxjs/toolkit';

// Character related types
export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  experience: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skills: Record<string, number>;
  inventory: InventoryItem[];
  health: {
    current: number;
    max: number;
  };
  mana: {
    current: number;
    max: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
}

// User related types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

// Store related types
export interface CharacterState {
  currentCharacter: Character | null;
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  character: CharacterState;
  user: UserState;
  // Add other slices as needed
}

export type AppStore = Store<RootState>;
export type AppDispatch = AppStore['dispatch'];

// Rule Engine related types
export interface GameMiddleware {
  apply: (state: CharacterState, action: ReduxAction) => CharacterState;
}

export interface ClassMiddleware extends GameMiddleware {}
export interface RaceMiddleware extends GameMiddleware {}
export interface StatsMiddleware extends GameMiddleware {}

export type RuleEngineMiddleware = ReduxMiddleware<{}, RootState>;

// Action types
export interface Action<T = any> extends ReduxAction<string> {
  payload?: T;
}

// Thunk types
export type ThunkAction<ReturnType = void, ExtraArgument = unknown> = (
  dispatch: AppDispatch,
  getState: () => RootState,
  extraArgument: ExtraArgument
) => ReturnType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, unknown>;

// Middleware types
export type MiddlewareAPI = {
  dispatch: AppDispatch;
  getState: () => RootState;
};

export type Middleware = (
  api: MiddlewareAPI
) => (next: Dispatch) => (action: Action) => ReturnType<Dispatch>;

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ActionCreator<T = void> = (...args: any[]) => Action<T>;

export type ActionCreatorsMapObject = {
  [actionCreator: string]: ActionCreator;
};

// Enum types
export enum CharacterClass {
  Fighter = 'Fighter',
  Wizard = 'Wizard',
  Rogue = 'Rogue',
  Cleric = 'Cleric',
}

export enum Race {
  Human = 'Human',
  Elf = 'Elf',
  Dwarf = 'Dwarf',
  Halfling = 'Halfling',
}

// Add any other shared types or interfaces here