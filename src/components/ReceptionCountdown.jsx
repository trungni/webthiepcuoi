import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Heart } from 'lucide-react';

export const ReceptionCountdown = ({ data, onOpenRsvp }) => {
  // Parse target date dynamically from data.banquet
  const targetDateInfo = useMemo(() => {
    const dayStr = data?.banquet?.day || '17';
    const monthStr = data?.banquet?.month || 'THÁNG 11';
    const yearStr = data?.banquet?.year || '2026';
    const timeStr = data?.banquet?.time || '18:00';

    const day = parseInt(dayStr, 10) || 17;
    const year = parseInt(yearStr, 10) || 2026;

    // Extract month number from string (e.g. "THÁNG 11" -> 11)
    const match = String(monthStr).match(/\d+/);
    const month = match ? parseInt(match[0], 10) : 11;

    // Extract hours and minutes
    const [hours, minutes] = timeStr.split(':').map((v) => parseInt(v, 10) || 0);

    const targetDateObj = new Date(year, month - 1, day, hours, minutes, 0);

    return {
      day,
      month,
      year,
      hours,
      minutes,
      targetDateObj
    };
  }, [
    data?.banquet?.day,
    data?.banquet?.month,
    data?.banquet?.year,
    data?.banquet?.time,
    data?.banquet?.fullDateISO
  ]);

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetTimestamp = targetDateInfo.targetDateObj.getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateInfo]);

  // Dynamic Calendar Calculation
  const calendarData = useMemo(() => {
    const { year, month, day: targetDay } = targetDateInfo;

    // Day of week of the 1st of this month (0: Sunday, 1: Monday, ..., 6: Saturday)
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

    // In Vietnam: Monday (T2) is index 0, Sunday (CN) is index 6
    // If firstDayOfWeek === 0 (Sunday), empty cells = 6
    // If firstDayOfWeek === 1 (Monday), empty cells = 0
    const emptyCellsCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const emptyCells = Array.from({ length: emptyCellsCount });

    // Total days in this month
    const totalDays = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    return {
      emptyCells,
      daysArray,
      targetDay,
      month,
      year
    };
  }, [targetDateInfo]);

  return (
    <section className="w-full bg-[#fff7eb] text-[#1F3A25] pb-10">
      {/* Title Header */}
      <div className="w-full py-3.5 sm:py-4 bg-[#1F3A25] shadow-sm">
        <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-widest text-[#e8f0e4] font-serif-title">
          {data.banquet.title}
        </h2>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8 text-center">
        {/* Subtitle */}
        <p className="text-sm sm:text-base uppercase tracking-wider text-[#1F3A25] font-serif-title">
          {data.banquet.subTitle}
        </p>

        {/* Big Time */}
        <div className="text-2xl sm:text-3xl font-semibold mt-1 font-serif-title">
          {data.banquet.time}
        </div>

        {/* Date Display */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 font-serif-title">
          <span className="text-xs sm:text-sm font-semibold text-[#666666] uppercase tracking-wider w-20 text-right">
            {data.banquet.dayOfWeek}
          </span>
          <span className="w-px h-7 bg-[#1F3A25]/30"></span>
          <span className="text-3xl sm:text-4xl font-bold text-[#1F3A25]">
            {data.banquet.day}
          </span>
          <span className="w-px h-7 bg-[#1F3A25]/30"></span>
          <span className="text-xs sm:text-sm font-semibold text-[#666666] uppercase tracking-wider w-20 text-left">
            {data.banquet.month}
          </span>
        </div>

        <p className="text-base sm:text-lg text-[#666666] font-serif-title">
          {data.banquet.year}
        </p>
        <p className="text-xs sm:text-sm text-[#777777] italic mt-1 font-serif-title">
          ({data.banquet.lunarDate})
        </p>

        {/* Khai tiệc */}
        <div className="flex items-center justify-center gap-8 mt-5">
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#666666] font-serif-title">
              Khai tiệc
            </span>
            <span className="text-xl sm:text-2xl font-bold mt-0.5 text-[#1F3A25] font-serif-title">
              {data.banquet.time}
            </span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="mt-8 pt-6 border-t border-[#1F3A25]/15">
          <h3 className="text-base sm:text-lg uppercase tracking-wider text-[#666666] font-serif-title font-semibold mb-4">
            CÙNG ĐẾM NGƯỢC
          </h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-[340px] mx-auto">
            <div className="bg-[#1F3A25]/10 rounded-xl p-2.5 sm:p-3 border border-[#1F3A25]/20 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-bold text-[#1F3A25] font-serif-title">
                {timeLeft.days}
              </span>
              <span className="block text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mt-0.5 font-sans font-medium">
                Ngày
              </span>
            </div>
            <div className="bg-[#1F3A25]/10 rounded-xl p-2.5 sm:p-3 border border-[#1F3A25]/20 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-bold text-[#1F3A25] font-serif-title">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mt-0.5 font-sans font-medium">
                Giờ
              </span>
            </div>
            <div className="bg-[#1F3A25]/10 rounded-xl p-2.5 sm:p-3 border border-[#1F3A25]/20 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-bold text-[#1F3A25] font-serif-title">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mt-0.5 font-sans font-medium">
                Phút
              </span>
            </div>
            <div className="bg-[#1F3A25]/10 rounded-xl p-2.5 sm:p-3 border border-[#1F3A25]/20 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-bold text-[#1F3A25] font-serif-title text-emerald-800">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mt-0.5 font-sans font-medium">
                Giây
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Mini Calendar */}
        <div className="mt-8 max-w-[320px] mx-auto rounded-xl overflow-hidden border border-[#1F3A25]/25 bg-white shadow-sm">
          <div className="py-2.5 text-xs sm:text-sm font-semibold tracking-wide border-b border-[#1F3A25]/20 bg-[#1F3A25]/5 text-[#1F3A25]">
            Tháng {calendarData.month} / {calendarData.year}
          </div>

          <div className="grid grid-cols-7 border-b border-[#1F3A25]/20 text-[11px] font-semibold text-[#666666] py-1.5 bg-[#1F3A25]/5">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>

          <div className="grid grid-cols-7 gap-y-1 p-2 text-xs text-[#1F3A25]">
            {calendarData.emptyCells.map((_, i) => (
              <div key={`empty-${i}`} className="h-8 flex items-center justify-center"></div>
            ))}
            {calendarData.daysArray.map((day) => {
              const isWeddingDay = day === calendarData.targetDay;
              return (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center"
                >
                  {isWeddingDay ? (
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 22"
                        className="absolute inset-0 w-full h-full drop-shadow-sm"
                        fill="#1F3A25"
                      >
                        <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                      </svg>
                      <span className="relative z-10 text-white font-bold text-[11px]">
                        {day}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[#444444] font-medium">{day}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add to Google Calendar Link */}
        <div className="mt-5">
          <a
            href={data.banquet.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#1F3A25] underline underline-offset-4 hover:opacity-75 transition-opacity"
          >
            <Calendar className="w-4 h-4" />
            <span>Thêm vào lịch</span>
          </a>
        </div>

        {/* RSVP Call-to-Action Button */}
        <div className="mt-7">
          <button
            onClick={onOpenRsvp}
            className="px-8 sm:px-10 py-3 rounded-xl font-serif-title text-base sm:text-lg font-bold tracking-wider text-[#e8f0e4] bg-[#1F3A25] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span>XÁC NHẬN THAM DỰ</span>
          </button>
        </div>
      </div>
    </section>
  );
};
