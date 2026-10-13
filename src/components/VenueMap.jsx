import React, { useMemo } from 'react';
import { Navigation, MapPin, ExternalLink } from 'lucide-react';

export const VenueMap = ({ data }) => {
  // Compute accurate map embed and directions URLs
  const { embedUrl, directionsUrl, fullSearchAddress } = useMemo(() => {
    const venue = data?.banquet?.venueName || 'Gala Center';
    const address =
      data?.banquet?.venueAddress ||
      '415 Hoàng Văn Thụ, Phường 2, Tân Bình, Hồ Chí Minh';

    const fullQuery = `${venue}, ${address}`;
    const encoded = encodeURIComponent(fullQuery);

    // Reliable Google Maps embed for the exact venue
    const embed = `https://maps.google.com/maps?q=${encoded}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    const directions = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;

    return {
      embedUrl: embed,
      directionsUrl: directions,
      fullSearchAddress: fullQuery
    };
  }, [data?.banquet?.venueName, data?.banquet?.venueAddress]);

  return (
    <section className="w-full bg-[#fff7eb] pb-10">
      {/* Title Header */}
      <div className="w-full py-3.5 sm:py-4 bg-[#1F3A25] shadow-sm">
        <h3 className="text-center font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-widest text-[#e8f0e4] font-serif-title">
          Tiệc cưới sẽ tổ chức tại
        </h3>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-6 text-center">
        {/* Address Card */}
        <div className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-[#1F3A25]/15 shadow-sm mb-5">
          <div className="flex items-center justify-center gap-2 text-[#1F3A25] font-bold text-lg sm:text-xl mb-1.5 font-serif-title">
            <MapPin className="w-5 h-5 text-emerald-800 shrink-0" />
            <span>{data.banquet.venueName}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans max-w-md mx-auto">
            {data.banquet.venueAddress}
          </p>
        </div>

        {/* Map Embed Container with High Accuracy */}
        <div className="w-full h-[330px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-[#1F3A25]/20 shadow-md relative bg-[#e5e3df]">
          <iframe
            key={embedUrl}
            title={data.banquet.venueName || 'Địa điểm tổ chức tiệc cưới'}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Navigation Action Buttons */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-serif-title text-sm sm:text-base font-semibold text-[#1F3A25] bg-white border border-[#1F3A25]/30 shadow-md hover:bg-[#1F3A25] hover:text-[#e8f0e4] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Navigation className="w-4 h-4 text-emerald-700 group-hover:text-white" />
            <span>Chỉ đường trên Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
};
