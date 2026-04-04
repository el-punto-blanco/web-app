/** Primary UI tint + darker shade (gradient / borders) per FIFA code — flag-inspired */
const THEMES: Record<string, { primary: string; deep: string }> = {
  CAN: { primary: '#b91c1c', deep: '#7f1d1d' },
  MEX: { primary: '#047857', deep: '#065f46' },
  USA: { primary: '#1d4ed8', deep: '#1e3a8a' },
  CUW: { primary: '#002b7f', deep: '#001a4d' },
  HTI: { primary: '#002a8f', deep: '#001550' },
  PAN: { primary: '#005293', deep: '#003566' },
  ARG: { primary: '#38bdf8', deep: '#0369a1' },
  BRA: { primary: '#16a34a', deep: '#14532d' },
  COL: { primary: '#facc15', deep: '#ca8a04' },
  ECU: { primary: '#fbbf24', deep: '#b45309' },
  PAR: { primary: '#d32f2f', deep: '#991b1b' },
  URU: { primary: '#1e40af', deep: '#172554' },
  AUT: { primary: '#dc2626', deep: '#991b1b' },
  BEL: { primary: '#eab308', deep: '#a16207' },
  BIH: { primary: '#002395', deep: '#001a6e' },
  CRO: { primary: '#dc2626', deep: '#7f1d1d' },
  CZE: { primary: '#1d4ed8', deep: '#1e3a8a' },
  ENG: { primary: '#b91c1c', deep: '#7f1d1d' },
  FRA: { primary: '#1d4ed8', deep: '#172554' },
  GER: { primary: '#111827', deep: '#030712' },
  NED: { primary: '#f97316', deep: '#c2410c' },
  NOR: { primary: '#b91c1c', deep: '#7f1d1d' },
  POR: { primary: '#dc2626', deep: '#991b1b' },
  SCO: { primary: '#005eb8', deep: '#003d7a' },
  ESP: { primary: '#b91c1c', deep: '#7f1d1d' },
  SWE: { primary: '#2563eb', deep: '#1e40af' },
  SUI: { primary: '#dc2626', deep: '#991b1b' },
  TUR: { primary: '#e11d48', deep: '#9f1239' },
  AUS: { primary: '#1d4ed8', deep: '#172554' },
  IRQ: { primary: '#15803d', deep: '#14532d' },
  IRN: { primary: '#15803d', deep: '#14532d' },
  JPN: { primary: '#b91c1c', deep: '#7f1d1d' },
  JOR: { primary: '#15803d', deep: '#14532d' },
  KOR: { primary: '#1d4ed8', deep: '#1e3a8a' },
  QAT: { primary: '#7c1d6f', deep: '#4c0f3f' },
  SAU: { primary: '#15803d', deep: '#14532d' },
  UZB: { primary: '#0ea5e9', deep: '#0369a1' },
  ALG: { primary: '#15803d', deep: '#14532d' },
  CPV: { primary: '#1d4ed8', deep: '#1e3a8a' },
  COD: { primary: '#007fff', deep: '#0056b3' },
  CIV: { primary: '#f97316', deep: '#c2410c' },
  EGY: { primary: '#b91c1c', deep: '#7f1d1d' },
  GHA: { primary: '#15803d', deep: '#14532d' },
  MAR: { primary: '#c026d3', deep: '#86198f' },
  SEN: { primary: '#15803d', deep: '#14532d' },
  RSA: { primary: '#15803d', deep: '#14532d' },
  TUN: { primary: '#dc2626', deep: '#991b1b' },
  NZL: { primary: '#1d4ed8', deep: '#172554' },
};

const DEFAULT_THEME = { primary: '#1e40af', deep: '#172554' };

export function getCountryTheme(code: string | undefined): {
  primary: string;
  deep: string;
} {
  if (!code) return DEFAULT_THEME;
  return THEMES[code] ?? DEFAULT_THEME;
}
