import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Update this import
import { raceMiddleware } from './middlewares/raceMiddleware';
import { classMiddleware } from './middlewares/classMiddleware';
import { statsMiddleware } from './middlewares/statsMiddleware';

// Updated RuleEngineMiddleware type to match Redux's Middleware type
type RuleEngineMiddleware = Middleware<{}, RootState>; 

// No changes are needed for the composeMiddleware function

const composeMiddleware = (...middlewares: RuleEngineMiddleware[]): RuleEngineMiddleware => {
  return (api) => (next) => (action) => {
    let dispatch = next;
    middlewares.reverse().forEach(middleware => {
      dispatch = middleware(api)(dispatch);
    });
    return dispatch(action);
  };
};

export const ruleEngine = composeMiddleware(
  raceMiddleware,
  classMiddleware,
  statsMiddleware
);