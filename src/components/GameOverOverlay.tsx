import { Shot, copyShare, resultToOutcome, getCountryFlag } from '../utils/sharing';

interface GameOverOverlayProps {
  stats: {
    goals: number;
    shots: number;
  };
  shotHistory: Array<{
    id: number;
    target: { x: number; y: number; z: number };
    result: string;
    isGoal: boolean;
    timestamp: Date;
  }>;
  countryName: string;
  onRestart: () => void;
  onMainMenu: () => void;
}

export function GameOverOverlay({
  stats,
  shotHistory,
  countryName,
  onRestart,
  onMainMenu,
}: GameOverOverlayProps) {
  // Map each shot to a single letter: G = goal, S = save, X = miss
  const outcomeLetter = (shot: { isGoal: boolean; result: string }) =>
    shot.isGoal ? 'G' : shot.result?.includes('SAVE') ? 'S' : 'X';

  // Accuracy = goals / shots, as a whole percentage
  const accuracy = stats.shots > 0 ? Math.round((stats.goals / stats.shots) * 100) : 0;

  // Best streak = longest run of consecutive goals
  let bestStreak = 0;
  let run = 0;
  for (const shot of shotHistory) {
    if (shot.isGoal) {
      run += 1;
      bestStreak = Math.max(bestStreak, run);
    } else {
      run = 0;
    }
  }

  const handleCopyResults = async () => {
    try {
      const shots: Shot[] = shotHistory.map((shot) => ({
        outcome: resultToOutcome(shot.result, shot.isGoal),
      }));
      const countryFlag = getCountryFlag(countryName);
      await copyShare(shots, { countryFlag, sessionNumber: 1, totalSessions: 3 });
      alert('Results copied to clipboard! Share them on social media!');
    } catch (error) {
      console.error('Failed to copy results:', error);
      alert('Failed to copy results. Please try again.');
    }
  };

  return (
    <div className="pixel-text absolute inset-0 z-40 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md border-4 border-black bg-white p-6 text-black">
        {/* Title */}
        <h2 className="mb-4 text-xl">FINAL</h2>

        {/* Goal frame + shot chart (letters laid out like a net) */}
        <div className="mb-4 border-4 border-b-0 border-black p-3">
          <div className="grid min-h-[72px] grid-cols-3 place-items-center gap-y-2 text-[0.7rem]">
            {shotHistory.map((shot) => (
              <span key={shot.id}>{outcomeLetter(shot)}</span>
            ))}
          </div>
        </div>

        {/* Stat labels */}
        <div className="mb-2 flex justify-between text-[0.6rem]">
          <span>Streak</span>
          <span>Accuracy</span>
          <span>Goals</span>
        </div>

        {/* Black stat bar with the values */}
        <div className="mb-4 flex justify-between bg-black px-4 py-2 text-[0.6rem] text-white">
          <span>{bestStreak}</span>
          <span>{accuracy}%</span>
          <span>{stats.goals}</span>
        </div>

        {/* Leaderboard rank (placeholder until a real leaderboard exists) */}
        <p className="mb-5 text-[0.6rem]">Leaderboard Rank: #47</p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopyResults}
            className="border-2 border-black bg-yellow-400 px-4 py-2 text-[0.6rem] text-black hover:opacity-90"
          >
            Share
          </button>
          <div className="flex gap-2">
            <button
              onClick={onRestart}
              className="flex-1 border-2 border-black bg-white px-4 py-2 text-[0.6rem] text-black hover:bg-gray-100"
            >
              Play Again
            </button>
            <button
              onClick={onMainMenu}
              className="flex-1 border-2 border-black bg-white px-4 py-2 text-[0.6rem] text-black hover:bg-gray-100"
            >
              Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
