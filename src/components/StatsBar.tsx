interface StatsBarProps {
  countryName: string;
  countryFlag: string;
  stats: {
    goals: number;
    streak: number;
    shots: number;
    best: number;
  };
  attemptsLeft: number;
  /** Flag-inspired navbar background (solid) */
  themePrimary: string;
}

export function StatsBar({
  countryName,
  countryFlag,
  stats,
  attemptsLeft,
  themePrimary,
}: StatsBarProps) {
  const MAX_ATTEMPTS = 3;
  const MAX_STREAK_HEAT = 5;
  const shotPercentage =
    stats.shots > 0 ? Math.round((stats.goals / stats.shots) * 100) : 0;
  const flameHeat = Math.min(stats.streak, MAX_STREAK_HEAT) / MAX_STREAK_HEAT;

  return (
    <div
      className="absolute top-4 left-4 right-4 z-10 mx-auto max-w-[1152px] border-4 border-black px-3 py-3 shadow-[0_4px_0_rgba(0,0,0,0.4)] sm:px-4 sm:py-4 pixel-text"
      style={{ backgroundColor: themePrimary }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-10 shrink-0 overflow-hidden border-2 border-black bg-white sm:h-8 sm:w-12">
            <img
              src={countryFlag}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
            {countryName}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-[0.55rem] font-bold uppercase text-white sm:gap-x-6 sm:text-[0.65rem]">
          <span>GOALS {stats.goals}</span>
          <span className="border-2 border-black bg-red-700 px-2 py-0.5">BEST {stats.best}</span>
          <span className="text-2xl leading-none text-white sm:text-3xl">{shotPercentage}%</span>
          <span className="flex items-center gap-2 text-xs sm:text-sm">
            <img
              src="/fire-streak.gif"
              alt=""
              className="h-8 w-8 sm:h-10 sm:w-10"
              style={{
                imageRendering: 'pixelated',
                opacity: flameHeat,
                filter: `saturate(${0.25 + flameHeat * 1.75}) brightness(${0.35 + flameHeat * 0.65})`,
              }}
            />
            <span>{stats.streak}</span>
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
              const active = index < attemptsLeft;
              return (
                <span
                  key={index}
                  className={`h-4 w-4 border-2 border-black sm:h-5 sm:w-5 ${
                    active ? 'bg-white' : 'bg-neutral-900'
                  }`}
                  style={{ borderRadius: '2px' }}
                  aria-hidden="true"
                />
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
