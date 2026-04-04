'use client';

import { Country } from '../lib/types';
import { useEffect, useMemo } from 'react';

const COLS = 6;
const MAX_ROWS = 8;

/** Flag tile width (PNG + SVG); scaled −25% from prior step */
const TILE =
  'box-border w-[6.75rem] sm:w-[8.015625rem] md:w-[10.125rem]';

interface CountryGridProps {
  items: Country[];
  selectedCountry: string | null;
  onCountrySelect: (country: string) => void;
}

function chunkRows(list: Country[], cols: number, maxRows: number): Country[][] {
  const cap = cols * maxRows;
  const visible = list.slice(0, cap);
  const rows: Country[][] = [];
  for (let i = 0; i < visible.length; i += cols) {
    rows.push(visible.slice(i, i + cols));
  }
  return rows;
}

export const CountryGrid: React.FC<CountryGridProps> = ({
  items,
  selectedCountry,
  onCountrySelect,
}) => {
  const selectedIndex = items.findIndex((c) => c.name === selectedCountry);

  const rows = useMemo(
    () => chunkRows(items, COLS, MAX_ROWS),
    [items],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (items.length === 0) return;
      if (e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) return;

      const idx = selectedIndex < 0 ? 0 : selectedIndex;
      let newIndex = idx;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newIndex = Math.max(0, idx - COLS);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = Math.min(items.length - 1, idx + COLS);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = Math.max(0, idx - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIndex = Math.min(items.length - 1, idx + 1);
          break;
        default:
          return;
      }

      if (newIndex !== idx && newIndex >= 0 && newIndex < items.length) {
        onCountrySelect(items[newIndex].name);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items, onCountrySelect]);

  if (items.length === 0) {
    return (
      <p className="text-yellow-400 text-center text-xs sm:text-sm">
        No teams in this region.
      </p>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-full flex-col items-center gap-y-[0.5625rem] sm:gap-y-[1.265625rem]">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full flex-row flex-wrap justify-center gap-x-[0.5625rem] gap-y-[0.5625rem] sm:gap-x-[1.265625rem] sm:gap-y-[1.265625rem]"
          >
            {row.map((country) => {
              const isSelected = selectedCountry === country.name;

              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => onCountrySelect(country.name)}
                  className={`
                    ${TILE} shrink-0
                    p-0 border-4 transition-colors duration-150
                    focus:outline-none
                    ${isSelected
                      ? 'border-yellow-400'
                      : 'border-transparent hover:border-yellow-400/50'
                    }
                  `}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="block w-full h-auto object-contain pixel-dot"
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
