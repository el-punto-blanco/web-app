import { useEffect, useState } from 'react';

interface HowToPlayModalProps {
  open: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export function HowToPlayModal({ open, onClose, onStartGame }: HowToPlayModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleStartGame = () => {
    if (dontShowAgain) {
      try { localStorage.setItem('pp_seen_howto', '1'); } catch {}
    }
    onStartGame();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* الطبقة 1: الغطاء الأسود الشفّاف، الضغط عليه يُغلق */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* الطبقة 2: الصندوق الأبيض البكسلي */}
      <div className="pixel-text relative z-10 w-full max-w-md bg-white border-4 border-black p-6 text-black">
        <h2 className="text-base mb-4">How to play</h2>

        <p className="text-[0.6rem] leading-relaxed mb-4">
          Score as many penalties as you can.
        </p>

        <p className="text-[0.6rem] mb-2">Each shot has 3 outcomes</p>
        <div className="text-[0.6rem] leading-relaxed mb-4">
          <div>X &ndash; Miss</div>
          <div>G &ndash; Goal</div>
          <div>S &ndash; Save</div>
        </div>

        <p className="text-[0.6rem] mb-2">Relevant:</p>
        <div className="flex justify-between text-[0.6rem] mb-4">
          <span>Streak</span>
          <span>Accuracy</span>
          <span>Goals</span>
        </div>

        <p className="text-[0.6rem] leading-relaxed mb-6">
          Top of the leaderboard for each month wins a prize!
        </p>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-[0.55rem] cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            Don&apos;t show again
          </label>
          <button
            onClick={handleStartGame}
            className="bg-yellow-400 text-black border-2 border-black px-4 py-2 text-[0.6rem] hover:opacity-90"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
