interface StatsBarProps {
  countryCode: string;
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
  countryCode,
  countryFlag,
  stats,
  attemptsLeft,
  themePrimary,
}: StatsBarProps) {
  const MAX_ATTEMPTS = 3;
  const MAX_STREAK_HEAT = 5;
  const flameHeat =
    Math.min(Math.max(stats.streak - 1, 0), MAX_STREAK_HEAT - 1) /
    (MAX_STREAK_HEAT - 1);
  const isFireAnimated = stats.streak > 1;

  return (
    <div
      className="pixel-text absolute top-4 left-4 right-4 z-10 mx-auto max-w-[1152px] overflow-visible px-3 py-3 sm:px-4 sm:py-4"
      style={{ backgroundColor: themePrimary }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex items-center gap-2 pl-10 sm:pl-12">
          <div className="absolute left-[-2.5rem] top-1/2 h-[48px] w-[72px] -translate-y-[63%] overflow-hidden sm:left-[-2.875rem] sm:h-[54px] sm:w-[84px] sm:-translate-y-[58%]">
            <img
              src={countryFlag}
              alt=""
              className="pixel-dot h-full w-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <span className="text-2xl font-bold uppercase leading-none tracking-wide text-white sm:text-3xl">
            {countryCode}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-base font-bold uppercase leading-none text-white sm:gap-x-7 sm:text-lg">
          <span className="inline-flex items-center gap-2 leading-none">
            <span>SCORE</span>
            <span className="min-w-[2ch] text-right">{stats.goals}</span>
          </span>
          <span className="inline-flex items-center gap-3 leading-none">
            <img
              src={isFireAnimated ? '/fire-streak.gif' : '/fire-streak-static.png'}
              alt=""
              className="h-[3.375rem] w-[3.375rem] sm:h-[4.125rem] sm:w-[4.125rem]"
              style={{
                imageRendering: 'pixelated',
                opacity: 1,
                filter: `saturate(${0.35 + flameHeat * 2.05}) brightness(${0.7 + flameHeat * 0.3})`,
                transition: 'filter 160ms linear',
              }}
            />
            <span className="min-w-[3ch] text-left leading-none">x{stats.streak}</span>
          </span>
          <span className="inline-flex items-center gap-2 leading-none sm:gap-3">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
              const active = index < attemptsLeft;
              return (
                <img
                  key={index}
                  src="/logo.svg"
                  alt=""
                  className="h-7 w-7 sm:h-9 sm:w-9"
                  style={{
                    imageRendering: 'pixelated',
                    opacity: active ? 1 : 0.25,
                    filter: active ? 'none' : 'grayscale(1) saturate(0)',
                  }}
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
