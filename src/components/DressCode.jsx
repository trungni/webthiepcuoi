import React from 'react';

export const DressCode = ({ dressCode }) => {
  return (
    <section className="w-full bg-[#fff7eb] py-8 sm:py-10 border-t border-[#1F3A25]/10">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-[#1F3A25] font-serif-title">
          {dressCode.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#1F3A25]/70 font-serif-title mt-1 tracking-wider">
          {dressCode.subtitle}
        </p>

        {/* Color Palette Swatches */}
        <div className="flex justify-center items-center gap-5 sm:gap-8 mt-6">
          {dressCode.colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: c.hex,
                  border: c.hex === '#E8E8E8' ? '1.5px solid #1F3A2530' : 'none'
                }}
              />
              <span className="text-[11px] sm:text-xs text-[#666666] font-medium mt-2">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
