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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-2xl font-extrabold">How To Play</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div className="p-6 space-y-4 text-gray-800">
          <p><strong>Score as many penalties as you can.</strong><br/>Your run ends once the keeper makes 5 saves.</p>
          <p>Aim anywhere on the goal and shoot.</p>
          <p>Each shot has one of three outcomes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>🟩 <strong>Goal</strong> — you score.</li>
            <li>🧤 <strong>Save</strong> — the keeper stops it. Reach 5 saves and your run ends.</li>
            <li>🟥 <strong>Miss</strong> — you miss the net.</li>
          </ul>
          <p>You get 3 sessions per day. After finishing a session, tap Share to copy your result.</p>
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            Don&apos;t show again
          </label>
          <button
            onClick={handleStartGame}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
