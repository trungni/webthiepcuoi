import React from 'react';

export const CeremonyInfo = ({ data }) => {
  return (
    <section className="w-full bg-[#fff7eb] text-[#1F3A25]">
      {/* Section Header Bar */}
      <div className="w-full py-3.5 sm:py-4 bg-[#1F3A25] shadow-sm">
        <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-widest text-[#e8f0e4] font-serif-title">
          THÔNG TIN LỄ CƯỚI
        </h2>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8 sm:py-10">
        {/* Parents Information Grid */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-x-3 sm:gap-x-6 text-center font-serif-title">
          {/* Nhà Trai */}
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm text-[#777777] uppercase tracking-wider mb-1">
              Nhà Trai
            </span>
            <span className="text-xs text-[#888888]">Ông Bà</span>
            <p className="font-semibold text-sm sm:text-base text-[#1F3A25] mt-0.5">
              {data.groom.father}
            </p>
            <p className="font-semibold text-sm sm:text-base text-[#1F3A25]">
              {data.groom.mother}
            </p>
            <p className="text-[11px] sm:text-xs text-[#777777] mt-1.5 leading-relaxed font-sans max-w-[170px]">
              {data.groom.address}
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-28 bg-[#1F3A25]/30 self-center"></div>

          {/* Nhà Gái */}
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm text-[#777777] uppercase tracking-wider mb-1">
              Nhà Gái
            </span>
            <span className="text-xs text-[#888888]">Ông Bà</span>
            <p className="font-semibold text-sm sm:text-base text-[#1F3A25] mt-0.5">
              {data.bride.father}
            </p>
            <p className="font-semibold text-sm sm:text-base text-[#1F3A25]">
              {data.bride.mother}
            </p>
            <p className="text-[11px] sm:text-xs text-[#777777] mt-1.5 leading-relaxed font-sans max-w-[170px]">
              {data.bride.address}
            </p>
          </div>
        </div>

        {/* Announcement Text */}
        <div className="text-center mt-10 mb-6">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#1F3A25]/80 font-cormorant font-semibold">
            TRÂN TRỌNG BÁO TIN
          </p>
          <h3 className="text-sm sm:text-base uppercase tracking-[0.2em] text-[#1F3A25] font-serif-title font-bold mt-1">
            LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
          </h3>
        </div>

        {/* Groom & Bride Callout */}
        <div className="flex flex-col items-center justify-center my-6 space-y-1">
          <h4 className="text-3xl sm:text-4xl font-serif-title font-semibold text-[#1F3A25] tracking-wide">
            {data.groom.fullName}
          </h4>
          <span className="text-xs uppercase tracking-[0.25em] text-[#777777]">
            {data.groom.roleLabel}
          </span>

          <div className="text-2xl sm:text-3xl text-[#777777] font-serif-title my-1">
            &
          </div>

          <h4 className="text-3xl sm:text-4xl font-serif-title font-semibold text-[#1F3A25] tracking-wide">
            {data.bride.fullName}
          </h4>
          <span className="text-xs uppercase tracking-[0.25em] text-[#777777]">
            {data.bride.roleLabel}
          </span>
        </div>

        {/* Ceremony Date & Location Box */}
        <div className="flex flex-col items-center text-center mt-8 pt-6 border-t border-[#1F3A25]/15">
          <p className="text-sm sm:text-base font-semibold text-[#1F3A25] tracking-wider uppercase font-serif-title">
            {data.ceremony.title}
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#1F3A25] tracking-widest uppercase font-serif-title mt-0.5">
            {data.ceremony.locationType}
          </p>

          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#666666] mt-2 font-sans">
            VÀO LÚC {data.ceremony.time}
          </p>

          {/* Date Badge */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 font-serif-title">
            <span className="text-xs sm:text-sm font-semibold text-[#666666] uppercase tracking-wider w-20 text-right">
              {data.ceremony.dayOfWeek}
            </span>
            <span className="w-px h-7 bg-[#1F3A25]/30"></span>
            <span className="text-3xl sm:text-4xl font-bold text-[#1F3A25]">
              {data.ceremony.day}
            </span>
            <span className="w-px h-7 bg-[#1F3A25]/30"></span>
            <span className="text-xs sm:text-sm font-semibold text-[#666666] uppercase tracking-wider w-20 text-left">
              {data.ceremony.month}
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#666666] font-serif-title">
            {data.ceremony.year}
          </p>
          <p className="text-xs sm:text-sm text-[#777777] italic mt-1 font-serif-title">
            ({data.ceremony.lunarDate})
          </p>
        </div>
      </div>
    </section>
  );
};
