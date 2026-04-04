// Types for the country selection interface
export type TeamRegion =
  | 'hosts'
  | 'americas'
  | 'europe'
  | 'asia'
  | 'africa';

export interface Country {
  name: string;
  flag: string;
  code: string;
  region: TeamRegion;
}

export interface GameState {
  selectedCountry: string | null;
  gamePhase: 'country-selection' | 'playing' | 'ended';
}
