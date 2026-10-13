import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer = ({ autoPlayTrigger = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Romantic wedding instrumental melody
  // Uses a widely accessible, reliable copyright-free wedding track
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3";

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Autoplay waiting for user interaction:", e);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback error:", err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        className="group relative flex items-center gap-2 px-3 py-2.5 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          backgroundColor: isPlaying ? '#1F3A25' : '#ffffff',
          color: isPlaying ? '#e8f0e4' : '#1F3A25',
          border: '1.5px solid #1F3A2525',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
        }}
        title={isPlaying ? "Nhấn để tắt nhạc" : "Nhấn để bật nhạc"}
      >
        {/* Vinyl Disc Icon */}
        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
          isPlaying ? 'animate-spin-slow' : ''
        }`}
        style={{
          background: isPlaying
            ? 'radial-gradient(circle, #e8f0e4 20%, #122418 21%, #122418 60%, #e8f0e4 61%, #122418 80%)'
            : 'radial-gradient(circle, #1F3A25 20%, #e8f0e4 21%, #e8f0e4 60%, #1F3A25 61%, #e8f0e4 80%)'
        }}>
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-inner" />
        </div>

        {/* Music Status & Wave Bars */}
        <div className="flex items-center gap-1.5 pr-1">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-4">
              <span className="w-1 bg-[#e8f0e4] rounded-full animate-pulse" style={{ height: '60%' }}></span>
              <span className="w-1 bg-[#e8f0e4] rounded-full animate-pulse" style={{ height: '100%', animationDelay: '0.2s' }}></span>
              <span className="w-1 bg-[#e8f0e4] rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0.4s' }}></span>
            </div>
          ) : (
            <Music className="w-4 h-4 opacity-70" />
          )}
          <span className="text-xs font-medium tracking-wide">
            {isPlaying ? 'Nhạc cưới' : 'Bật nhạc'}
          </span>
        </div>
      </button>
    </div>
  );
};
