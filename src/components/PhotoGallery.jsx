import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const PhotoGallery = ({ gallery = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null if closed, number if open
  const count = gallery.length;

  const nextPhoto = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  const prevPhoto = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % count);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + count) % count);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, count]);

  // Compute 3D transformation for index relative to activeIndex
  const getTransformStyle = (index) => {
    let diff = index - activeIndex;
    // Circular difference
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    if (diff === 0) {
      return {
        transform: 'translateX(0%) translateZ(0px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 100,
        pointerEvents: 'auto'
      };
    } else if (diff === 1) {
      return {
        transform: 'translateX(65%) translateZ(-160px) rotateY(-40deg) scale(0.85)',
        opacity: 0.75,
        zIndex: 90,
        pointerEvents: 'auto'
      };
    } else if (diff === -1) {
      return {
        transform: 'translateX(-65%) translateZ(-160px) rotateY(40deg) scale(0.85)',
        opacity: 0.75,
        zIndex: 90,
        pointerEvents: 'auto'
      };
    } else if (diff === 2 || diff === -count + 2) {
      return {
        transform: 'translateX(120%) translateZ(-300px) rotateY(-60deg) scale(0.7)',
        opacity: 0.45,
        zIndex: 80,
        pointerEvents: 'none'
      };
    } else if (diff === -2 || diff === count - 2) {
      return {
        transform: 'translateX(-120%) translateZ(-300px) rotateY(60deg) scale(0.7)',
        opacity: 0.45,
        zIndex: 80,
        pointerEvents: 'none'
      };
    } else {
      return {
        transform: 'translateX(0%) translateZ(-400px) scale(0.5)',
        opacity: 0,
        zIndex: 50,
        pointerEvents: 'none'
      };
    }
  };

  return (
    <section className="w-full bg-[#fff7eb] pb-10">
      {/* Title Header */}
      <div className="w-full py-3.5 sm:py-4 bg-[#1F3A25] shadow-sm">
        <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-widest text-[#e8f0e4] font-serif-title">
          Album Ảnh
        </h2>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-6 sm:pt-8">
        {/* 3D Coverflow Carousel Container */}
        <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full flex items-center justify-center overflow-hidden">
          {/* Arrow Buttons */}
          <button
            onClick={prevPhoto}
            aria-label="Ảnh trước"
            className="absolute left-2 sm:left-4 z-[120] w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            aria-label="Ảnh sau"
            className="absolute right-2 sm:right-4 z-[120] w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards in 3D Perspective */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            {gallery.map((photo, index) => {
              const style = getTransformStyle(index);
              return (
                <div
                  key={photo.id}
                  onClick={() => {
                    if (index === activeIndex) {
                      setLightboxIndex(index);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className="absolute h-[88%] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-700 ease-in-out border-2 border-white/40"
                  style={{
                    aspectRatio: '0.68',
                    ...style
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  {index === activeIndex && (
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors flex items-end justify-center pb-3">
                      <span className="text-[11px] uppercase tracking-wider bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-xs font-sans">
                        Nhấn để phóng to
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Xem ảnh ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex
                  ? 'w-7 h-2.5 bg-[#1F3A25]'
                  : 'w-2.5 h-2.5 bg-[#1F3A25]/30 hover:bg-[#1F3A25]/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Top Bar with Counter and Close Button */}
          <div className="flex items-center justify-between z-10 text-white">
            <span className="bg-white/20 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium">
              {lightboxIndex + 1} / {count}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
              title="Đóng"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Viewing Area */}
          <div className="relative flex-1 flex items-center justify-center my-2 max-h-[75vh]">
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + count) % count)}
              className="absolute left-2 sm:left-6 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <img
              src={gallery[lightboxIndex].url}
              alt={gallery[lightboxIndex].title}
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl select-none"
            />

            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % count)}
              className="absolute right-2 sm:right-6 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex justify-center items-center gap-2 overflow-x-auto py-2 px-4 no-scrollbar">
            {gallery.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setLightboxIndex(idx)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden transition-all cursor-pointer ${
                  idx === lightboxIndex
                    ? 'ring-3 ring-[#a8e6a3] scale-105 opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
