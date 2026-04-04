'use client';

import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const START_PATH = '/select?howto=1';

export default function Home() {
  const navigate = useNavigate();

  const goToSelect = useCallback(() => {
    navigate(START_PATH);
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = () => goToSelect();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToSelect]);

  return (
    <main
      className="pixel-text min-h-screen w-full flex flex-col bg-black"
    >
      {/* Full viewport width: two sections, no navbar */}
      <div className="w-full flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top: dark blue + logo only */}
        <section className="flex-1 min-h-[200px] flex items-end justify-center pb-12 sm:pb-16 md:pb-20 p-4 sm:p-6 md:p-8 bg-black">
          <img
            src="/logo.png"
            alt=""
            className="flex-shrink-0 w-96 h-auto sm:w-[32rem] md:w-[40rem] lg:w-[48rem] pixel-dot object-contain"
          />
        </section>

        {/* Bottom: green strip 35% of viewport; black rectangle always visible, only text flashes */}
        <section className="flex-shrink-0 h-[35vh] bg-black flex items-center justify-center p-6 sm:p-8">
          <button
            type="button"
            onClick={goToSelect}
            className="bg-black px-6 py-4 sm:px-8 sm:py-5 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800"
          >
            <span className="arcade-blink">PRESS ANY KEY TO PLAY</span>
          </button>
        </section>
      </div>
    </main>
  );
}
