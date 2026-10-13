import React from 'react';
import { DoubleHappinessIcon, SunburstBg } from './DoubleHappiness';

export const HeroSection = ({ data }) => {
  return (
    <header className="relative w-full overflow-hidden pb-12 sm:pb-16 pt-8 sm:pt-12 bg-[#1F3A25] text-[#e8f0e4]">
      {/* Sunburst background rays */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[150%] max-w-[900px] aspect-square pointer-events-none opacity-20">
        <SunburstBg color="#e8f0e4" opacity={0.35} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-4 text-center">
        {/* Welcome Tagline */}
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] font-cormorant font-semibold opacity-90 drop-shadow-sm mb-4">
          WELCOME TO OUR WEDDING
        </p>

        {/* Groom & Bride Header Banner with 囍 */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 my-2">
          {/* Groom side */}
          <div className="flex-1 text-center">
            <p className="text-[11px] sm:text-xs text-[#e8f0e4]/80 tracking-wider mb-1 font-sans">
              {data.groom.roleLabel}
            </p>
            <h2 className="text-xl sm:text-2xl font-serif-title uppercase tracking-wider font-semibold whitespace-nowrap">
              {data.groom.shortName}
            </h2>
          </div>

          {/* 囍 center emblem */}
          <div className="shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e8f0e4]/10 border border-[#e8f0e4]/30 shadow-inner">
            <span className="text-3xl sm:text-4xl text-[#e8f0e4] font-bold select-none">
              囍
            </span>
          </div>

          {/* Bride side */}
          <div className="flex-1 text-center">
            <p className="text-[11px] sm:text-xs text-[#e8f0e4]/80 tracking-wider mb-1 font-sans">
              {data.bride.roleLabel}
            </p>
            <h2 className="text-xl sm:text-2xl font-serif-title uppercase tracking-wider font-semibold whitespace-nowrap">
              {data.bride.shortName}
            </h2>
          </div>
        </div>

        {/* Arch Photo with Curved "LOVE NEVER FAILS" text */}
        <div className="relative mx-auto mt-8 w-[260px] sm:w-[320px] aspect-[286/420]">
          {/* Arch Container */}
          <div className="relative w-full h-full rounded-t-full overflow-hidden border-4 border-[#e8f0e4]/40 shadow-2xl bg-[#cad2c6]">
            <img
              src={data.heroPhoto}
              alt="Ảnh cưới Võ Hải Nam & Huỳnh Khánh Linh"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Curved Text "LOVE NEVER FAILS" SVG */}
          <div className="absolute inset-x-0 -top-6 h-28 pointer-events-none select-none overflow-visible">
            <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible">
              <defs>
                <path
                  id="archTextCurve"
                  d="M 15 150 A 135 135 0 0 1 285 150"
                  fill="none"
                />
              </defs>
              <text
                fill="#e8f0e4"
                fontSize="15"
                fontFamily="'Cormorant Garamond', 'Playfair Display', serif"
                letterSpacing="0.32em"
                fontWeight="600"
                className="drop-shadow"
              >
                <textPath href="#archTextCurve" startOffset="50%" textAnchor="middle">
                  LOVE NEVER FAILS
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
