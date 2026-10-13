import React, { useState } from 'react';
import { DoubleHappinessIcon } from './DoubleHappiness';

export const EnvelopeModal = ({ isOpen, onOpen, data }) => {
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen) return null;

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  // Pre-configured ambient particles with varied coordinates and speeds
  const ambientParticles = [
    { left: '12%', size: '14px', delay: '-2s', duration: '22s', sway: '-15px', color: '#a8e6a3' },
    { left: '25%', size: '18px', delay: '-6s', duration: '20s', sway: '18px', color: '#7bc47a' },
    { left: '38%', size: '12px', delay: '-14s', duration: '24s', sway: '-22px', color: '#c8e6c9' },
    { left: '50%', size: '20px', delay: '-8s', duration: '19s', sway: '12px', color: '#a8e6a3' },
    { left: '63%', size: '15px', delay: '-18s', duration: '23s', sway: '-10px', color: '#4CAF50' },
    { left: '76%', size: '22px', delay: '-4s', duration: '21s', sway: '25px', color: '#7bc47a' },
    { left: '88%', size: '13px', delay: '-11s', duration: '25s', sway: '-18px', color: '#a8e6a3' },
    { left: '18%', size: '16px', delay: '-9s', duration: '22s', sway: '20px', color: '#c8e6c9' },
    { left: '70%', size: '17px', delay: '-15s', duration: '20s', sway: '-12px', color: '#4CAF50' },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(to bottom right, #0a1f0e, #122418, #1F3A25)'
      }}
    >
      {/* Ambient Rising 囍 Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        {ambientParticles.map((p, i) => (
          <div
            key={i}
            className="absolute select-none pointer-events-none"
            style={{
              left: p.left,
              bottom: '-30px',
              fontSize: p.size,
              color: p.color,
              opacity: 0.65,
              animation: `ambient-rise ${p.duration} ease-in-out ${p.delay} infinite`,
              '--sway': p.sway
            }}
          >
            囍
          </div>
        ))}
      </div>

      {/* Main Envelope Container */}
      <div className="relative z-10 p-4">
        <div className="relative w-[310px] sm:w-[350px] md:w-[480px] max-w-[95vw]">
          {/* 3D Wax Seal Pulse Badge */}
          <div
            onClick={handleOpenClick}
            className="absolute left-1/2 -top-7 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-30 transition-transform active:scale-95 animate-seal-pulse"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #f2f7ef, #cad2c6, #98a594)',
              boxShadow: '0 6px 24px rgba(232, 240, 228, 0.5), inset 0 2px 4px rgba(255,255,255,0.7)'
            }}
            title="Nhấn để mở thiệp"
          >
            <div className="text-[#1F3A25] font-bold text-2xl drop-shadow-sm select-none">
              囍
            </div>
          </div>

          {/* Envelope Body Card */}
          <div
            className="relative rounded-2xl overflow-hidden p-6 sm:p-8 pt-12 text-center"
            style={{
              backgroundColor: '#1F3A25',
              border: '1px solid rgba(232, 240, 228, 0.25)',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.65), 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 40px rgba(232, 240, 228, 0.15)'
            }}
          >
            {/* Watermark 囍 on corners */}
            <div className="absolute -top-10 -left-10 text-[140px] text-[#e8f0e4] opacity-[0.06] select-none pointer-events-none rotate-12">
              囍
            </div>
            <div className="absolute -bottom-10 -right-10 text-[140px] text-[#e8f0e4] opacity-[0.06] select-none pointer-events-none -rotate-12">
              囍
            </div>

            {/* Sub-header */}
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#e8f0e4]/70 mb-3 font-cormorant">
              WEDDING INVITATION
            </p>

            {/* Groom & Bride Names */}
            <h1 className="text-3xl sm:text-4xl text-[#e8f0e4] font-serif-title leading-tight mb-2 tracking-wide">
              <span className="block">{data.groom.shortName}</span>
              <span className="block text-xl sm:text-2xl font-light text-[#e8f0e4]/80 my-0.5">&</span>
              <span className="block">{data.bride.shortName}</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#e8f0e4]/60"></div>
              <span className="text-[#e8f0e4]/80 text-xs">❦</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#e8f0e4]/60"></div>
            </div>

            {/* Wedding Date */}
            <div className="text-[#e8f0e4]/90 font-lora text-base sm:text-lg mb-4">
              <span>
                {data.banquet.day} {data.banquet.month.toLowerCase()}, {data.banquet.year}
              </span>
            </div>

            {/* "Thân Mời" */}
            <div className="mb-6">
              <p className="text-[#e8f0e4]/80 font-lora text-sm sm:text-base font-light italic">
                Thân Mời Quý Khách
              </p>
            </div>

            {/* Open Button with Shimmer */}
            <button
              onClick={handleOpenClick}
              className="relative px-8 sm:px-10 py-3 text-base sm:text-lg font-medium rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden inline-flex items-center justify-center"
              style={{
                backgroundColor: '#e8f0e4',
                color: '#1F3A25',
                boxShadow: '0 6px 20px rgba(232, 240, 228, 0.4)'
              }}
            >
              <span className="font-lora font-semibold tracking-wide flex items-center gap-2">
                <span>Mở thiệp</span>
                <span className="text-xs">✉</span>
              </span>
              {/* Shimmer Light Bar */}
              <div className="absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none animate-shine" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
