import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';

export type GameMiddleware = Middleware<{}, RootState>;

export function createMiddleware<A extends AnyAction = AnyAction>(
  type: 'class' | 'race' | 'stats',
  middlewareConfig: {
    match: (action: unknown) => action is A;
    apply: (state: RootState, action: A) => void;
  }
): GameMiddleware {
  return (store) => (next) => (action: unknown) => {
    const result = next(action);

    if (middlewareConfig.match(action)) {
      const state = store.getState();
      middlewareConfig.apply(state, action);
    }

    return result;
  };
}

export type ClassMiddleware = GameMiddleware;
export type RaceMiddleware = GameMiddleware;
export type StatsMiddleware = GameMiddleware;

export function createTypedMiddleware<T extends AnyAction>(
  type: 'class' | 'race' | 'stats',
  match: (action: unknown) => action is T,
  apply: (state: RootState, action: T) => void
): GameMiddleware {
  return createMiddleware(type, {
    match,
    apply,
  });
}