import React from 'react';

export const Timeline = ({ events = [] }) => {
  return (
    <section className="w-full bg-[#fff7eb] py-10 sm:py-12 border-t border-[#1F3A25]/10">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-[#1F3A25] font-serif-title text-center mb-8">
          LỊCH TRÌNH NGÀY CƯỚI
        </h2>

        {/* Timeline List */}
        <div className="relative mx-auto max-w-[380px] sm:max-w-[420px] font-serif-title">
          {events.map((event, index) => {
            const isFirst = index === 0;
            const isLast = index === events.length - 1;

            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_24px_1fr] items-center gap-x-4 sm:gap-x-6 py-3 sm:py-4"
              >
                {/* Time Column (Right-aligned) */}
                <div className="text-right text-base sm:text-lg font-bold text-[#1F3A25] tracking-wide tabular-nums">
                  {event.time}
                </div>

                {/* Vertical Line & Dot Column */}
                <div className="relative flex items-center justify-center self-stretch">
                  {/* Top connector line */}
                  {!isFirst && (
                    <div className="absolute top-0 bottom-1/2 w-px bg-[#1F3A25]/40" />
                  )}
                  {/* Bottom connector line */}
                  {!isLast && (
                    <div className="absolute top-1/2 bottom-0 w-px bg-[#1F3A25]/40" />
                  )}
                  {/* Center Dot */}
                  <div
                    className="relative z-10 w-3 h-3 rounded-full bg-[#1F3A25]"
                    style={{
                      boxShadow: '0 0 0 3px rgba(31, 58, 37, 0.2)'
                    }}
                  />
                </div>

                {/* Event Label Column (Left-aligned) */}
                <div className="text-left text-base sm:text-lg font-medium text-[#555555]">
                  {event.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
