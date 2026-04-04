'use client';

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryGrid } from '../../components/CountryGrid';
import { HowToPlayModal } from '../../components/HowToPlayModal';
import {
  getCountriesByRegion,
  REGION_LABELS,
  REGION_ORDER,
} from '../../lib/countries';
import type { TeamRegion } from '../../lib/types';

function cycleRegion(current: TeamRegion, delta: number): TeamRegion {
  const i = REGION_ORDER.indexOf(current);
  const n = REGION_ORDER.length;
  const next = (i + delta + n * 10) % n;
  return REGION_ORDER[next];
}

export default function SelectCountryPage() {
  const [region, setRegion] = useState<TeamRegion>('hosts');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);
  const [confirmedCountry, setConfirmedCountry] = useState<string | null>(null);
  const navigate = useNavigate();

  const regionCountries = useMemo(
    () => getCountriesByRegion(region),
    [region],
  );

  useEffect(() => {
    setSelectedCountry((prev) => {
      if (!prev) return null;
      return regionCountries.some((c) => c.name === prev) ? prev : null;
    });
  }, [region, regionCountries]);

  /** Shift + ← / → changes region (arrows alone move team; no Tab focus on grid). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setRegion((r) => cycleRegion(r, -1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setRegion((r) => cycleRegion(r, 1));
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, []);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  const handleConfirm = () => {
    if (!selectedCountry) return;
    setConfirmedCountry(selectedCountry);

    // If user previously chose "don't show again", skip the modal
    try {
      const seen = localStorage.getItem('pp_seen_howto');
      if (seen) {
        navigate(`/game?country=${encodeURIComponent(selectedCountry)}`);
        return;
      }
    } catch {}

    setShowHowTo(true);
  };

  const handleCloseHowTo = () => {
    setShowHowTo(false);
  };

  const handleStartGame = () => {
    setShowHowTo(false);
    if (confirmedCountry) {
      navigate(`/game?country=${encodeURIComponent(confirmedCountry)}`);
    }
  };

  return (
    <main className="pixel-text h-screen w-full flex flex-col overflow-hidden">
      <HowToPlayModal open={showHowTo} onClose={handleCloseHowTo} onStartGame={handleStartGame} />

      {/* Top: dark blue sky ~65% — fixed header, scrollable flags */}
      <section className="flex min-h-0 flex-[65] flex-col items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-3 pixel-bg overflow-hidden">
        {/* Fixed block: does not move when region / row count changes */}
        <div className="flex w-full max-w-md flex-shrink-0 flex-col items-center gap-3 sm:max-w-lg sm:gap-4">
          <div className="text-center">
            <div className="bg-black px-4 py-2 sm:px-6 sm:py-3 inline-block">
              <h1 className="text-white text-sm sm:text-lg md:text-2xl">
                SELECT YOUR TEAM
              </h1>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-2 text-xs sm:text-sm">
            <span className="text-yellow-400">REGION</span>
            <div
              role="group"
              aria-label="Choose region"
              className="flex w-full max-w-md items-center justify-center gap-2 rounded border-4 border-yellow-400 bg-black px-2 py-2 sm:gap-4 sm:px-4"
            >
              <button
                type="button"
                onClick={() => setRegion((r) => cycleRegion(r, -1))}
                className="min-w-[2.5rem] border-2 border-yellow-400 px-2 py-1 text-lg text-yellow-400 hover:bg-yellow-400/10"
                aria-label="Previous region"
              >
                ◀
              </button>
              <span className="min-w-[10rem] flex-1 text-center text-[0.65rem] text-yellow-400 sm:min-w-[12rem] sm:text-xs">
                {REGION_LABELS[region]}
              </span>
              <button
                type="button"
                onClick={() => setRegion((r) => cycleRegion(r, 1))}
                className="min-w-[2.5rem] border-2 border-yellow-400 px-2 py-1 text-lg text-yellow-400 hover:bg-yellow-400/10"
                aria-label="Next region"
              >
                ▶
              </button>
            </div>
          </div>

          <p className="min-h-[1.5rem] text-center text-yellow-400 text-xs sm:text-sm">
            {selectedCountry
              ? `SELECTED: ${selectedCountry.toUpperCase()}`
              : '\u00A0'
            }
          </p>
        </div>

        {/* Scroll area: only flags move */}
        <div className="mt-2 min-h-0 w-full flex-1 overflow-y-auto sm:mt-3 pb-1">
          <CountryGrid
            items={regionCountries}
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
          />
        </div>
      </section>

      {/* Bottom: green grass ~35% — confirm button */}
      <section className="flex-[35] pixel-grass flex items-center justify-center px-6">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedCountry}
          className={`
            px-10 py-3 sm:px-14 sm:py-4 text-xs sm:text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-offset-2
            transition-opacity
            ${selectedCountry
              ? 'bg-yellow-400 text-black hover:opacity-90 focus:ring-yellow-400 focus:ring-offset-green-800 cursor-pointer'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
            }
          `}
        >
          CONFIRM
        </button>
      </section>
    </main>
  );
}
