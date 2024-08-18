export interface Middleware {
    // Define common middleware interface
  }
  
  export interface ClassMiddleware extends Middleware {
    // Class-specific middleware properties
  }
  
  export interface RaceMiddleware extends Middleware {
    // Race-specific middleware properties
  }
  
  export interface StatsMiddleware extends Middleware {
    // Stats-specific middleware properties
  }