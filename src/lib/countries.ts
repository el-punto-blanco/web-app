import { Country, TeamRegion } from './types';

export const REGION_ORDER: TeamRegion[] = [
  'hosts',
  'americas',
  'europe',
  'asia',
  'africa',
];

export const REGION_LABELS: Record<TeamRegion, string> = {
  hosts: 'Hosts',
  americas: 'Americas',
  europe: 'Europe',
  asia: 'Asia-Pacific',
  africa: 'Africa',
};

export const countries: Country[] = [
  // Co-hosts
  { name: 'Canada', flag: '/flags/CAN.png', code: 'CAN', region: 'hosts' },
  { name: 'Mexico', flag: '/flags/MEX.png', code: 'MEX', region: 'hosts' },
  { name: 'United States', flag: '/flags/USA.png', code: 'USA', region: 'hosts' },

  // Concacaf (non-host) + CONMEBOL
  { name: 'Curaçao', flag: '/flags/CUW.png', code: 'CUW', region: 'americas' },
  { name: 'Haiti', flag: '/flags/HTI.png', code: 'HTI', region: 'americas' },
  { name: 'Panama', flag: '/flags/PAN.png', code: 'PAN', region: 'americas' },
  { name: 'Argentina', flag: '/flags/ARG.png', code: 'ARG', region: 'americas' },
  { name: 'Brazil', flag: '/flags/BRA.png', code: 'BRA', region: 'americas' },
  { name: 'Colombia', flag: '/flags/COL.png', code: 'COL', region: 'americas' },
  { name: 'Ecuador', flag: '/flags/ECU.png', code: 'ECU', region: 'americas' },
  { name: 'Paraguay', flag: '/flags/PAR.png', code: 'PAR', region: 'americas' },
  { name: 'Uruguay', flag: '/flags/URU.png', code: 'URU', region: 'americas' },

  // UEFA
  { name: 'Austria', flag: '/flags/AUT.png', code: 'AUT', region: 'europe' },
  { name: 'Belgium', flag: '/flags/BEL.png', code: 'BEL', region: 'europe' },
  { name: 'Bosnia and Herzegovina', flag: '/flags/BIH.png', code: 'BIH', region: 'europe' },
  { name: 'Croatia', flag: '/flags/CRO.png', code: 'CRO', region: 'europe' },
  { name: 'Czechia', flag: '/flags/CZE.png', code: 'CZE', region: 'europe' },
  { name: 'England', flag: '/flags/ENG.svg', code: 'ENG', region: 'europe' },
  { name: 'France', flag: '/flags/FRA.png', code: 'FRA', region: 'europe' },
  { name: 'Germany', flag: '/flags/GER.png', code: 'GER', region: 'europe' },
  { name: 'Netherlands', flag: '/flags/NED.png', code: 'NED', region: 'europe' },
  { name: 'Norway', flag: '/flags/NOR.png', code: 'NOR', region: 'europe' },
  { name: 'Portugal', flag: '/flags/POR.png', code: 'POR', region: 'europe' },
  { name: 'Scotland', flag: '/flags/SCO.svg', code: 'SCO', region: 'europe' },
  { name: 'Spain', flag: '/flags/ESP.png', code: 'ESP', region: 'europe' },
  { name: 'Sweden', flag: '/flags/SWE.png', code: 'SWE', region: 'europe' },
  { name: 'Switzerland', flag: '/flags/SUI.png', code: 'SUI', region: 'europe' },
  { name: 'Türkiye', flag: '/flags/TUR.png', code: 'TUR', region: 'europe' },

  // AFC
  { name: 'Australia', flag: '/flags/AUS.png', code: 'AUS', region: 'asia' },
  { name: 'Iraq', flag: '/flags/IRQ.png', code: 'IRQ', region: 'asia' },
  { name: 'Iran', flag: '/flags/IRN.png', code: 'IRN', region: 'asia' },
  { name: 'Japan', flag: '/flags/JPN.png', code: 'JPN', region: 'asia' },
  { name: 'Jordan', flag: '/flags/JOR.png', code: 'JOR', region: 'asia' },
  { name: 'Korea Republic', flag: '/flags/KOR.png', code: 'KOR', region: 'asia' },
  { name: 'Qatar', flag: '/flags/QAT.png', code: 'QAT', region: 'asia' },
  { name: 'Saudi Arabia', flag: '/flags/SAU.png', code: 'SAU', region: 'asia' },
  { name: 'Uzbekistan', flag: '/flags/UZB.png', code: 'UZB', region: 'asia' },

  // CAF
  { name: 'Algeria', flag: '/flags/ALG.png', code: 'ALG', region: 'africa' },
  { name: 'Cabo Verde', flag: '/flags/CPV.png', code: 'CPV', region: 'africa' },
  { name: 'Congo DR', flag: '/flags/COD.png', code: 'COD', region: 'africa' },
  { name: "Côte d'Ivoire", flag: '/flags/CIV.png', code: 'CIV', region: 'africa' },
  { name: 'Egypt', flag: '/flags/EGY.png', code: 'EGY', region: 'africa' },
  { name: 'Ghana', flag: '/flags/GHA.png', code: 'GHA', region: 'africa' },
  { name: 'Morocco', flag: '/flags/MAR.png', code: 'MAR', region: 'africa' },
  { name: 'Senegal', flag: '/flags/SEN.png', code: 'SEN', region: 'africa' },
  { name: 'South Africa', flag: '/flags/RSA.png', code: 'RSA', region: 'africa' },
  { name: 'Tunisia', flag: '/flags/TUN.png', code: 'TUN', region: 'africa' },

  // OFC (grouped with AFC for Asia-Pacific)
  { name: 'New Zealand', flag: '/flags/NZL.png', code: 'NZL', region: 'asia' },
];

export function getCountriesByRegion(region: TeamRegion): Country[] {
  return countries
    .filter((c) => c.region === region)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
}
