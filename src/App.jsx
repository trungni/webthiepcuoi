import React, { useState, useEffect, useRef } from 'react';
import { initialWeddingData } from './data/weddingData';
import { EnvelopeModal } from './components/EnvelopeModal';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { CeremonyInfo } from './components/CeremonyInfo';
import { PhotoGallery } from './components/PhotoGallery';
import { ReceptionCountdown } from './components/ReceptionCountdown';
import { VenueMap } from './components/VenueMap';
import { DressCode } from './components/DressCode';
import { Timeline } from './components/Timeline';
import { Guestbook } from './components/Guestbook';
import { GiftBoxSection, GiftBoxModal } from './components/GiftBoxModal';
import { RsvpModal } from './components/RsvpModal';
import { AdminDrawer } from './components/AdminDrawer';
import { Navbar } from './components/Navbar';
import { Settings, Sparkles } from 'lucide-react';

export default function App() {
  // Load data from localStorage or default, with automatic migration to 17/11/2026
  const [weddingData, setWeddingData] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_song_hy_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If saved data was from the old template with July 30, migrate date to 17/11/2026
        if (parsed?.banquet?.day === '30' && parsed?.banquet?.month === 'THÁNG 07') {
          return {
            ...parsed,
            ceremony: {
              ...parsed.ceremony,
              day: '17',
              month: 'THÁNG 11',
              year: '2026',
              dayOfWeek: 'THỨ BA',
              lunarDate: 'Tức ngày 09 tháng 10 năm Bính Ngọ',
              fullDateISO: '2026-11-17T09:00:00'
            },
            banquet: {
              ...parsed.banquet,
              day: '17',
              month: 'THÁNG 11',
              year: '2026',
              dayOfWeek: 'THỨ BA',
              lunarDate: 'Tức ngày 09 tháng 10 năm Bính Ngọ',
              fullDateISO: '2026-11-17T18:00:00',
              venueName: parsed.banquet?.venueName || 'Gala Center',
              venueAddress: parsed.banquet?.venueAddress || '415 Hoàng Văn Thụ, Phường 2, Tân Bình, Hồ Chí Minh',
              googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Gala+Center,+415+Hoàng+Văn+Thụ,+Phường+2,+Tân+Bình,+Hồ+Chí+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed',
              googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Gala+Center,+415+Hoàng+Văn+Thụ,+Phường+2,+Tân+Bình,+Hồ+Chí+Minh'
            }
          };
        }
        return parsed;
      }
      return initialWeddingData;
    } catch {
      return initialWeddingData;
    }
  });

  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_song_hy_comments');
      return saved ? JSON.parse(saved) : initialWeddingData.initialComments;
    } catch {
      return initialWeddingData.initialComments;
    }
  });

  const [rsvps, setRsvps] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_song_hy_rsvps');
      return saved ? JSON.parse(saved) : initialWeddingData.initialRsvps;
    } catch {
      return initialWeddingData.initialRsvps;
    }
  });

  // Check URL params for ?open=1
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('open') === '1';
  });

  const [audioTrigger, setAudioTrigger] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const guestbookRef = useRef(null);

  // Sync state to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem('wedding_song_hy_data', JSON.stringify(weddingData));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  }, [weddingData]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_song_hy_comments', JSON.stringify(comments));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  }, [comments]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_song_hy_rsvps', JSON.stringify(rsvps));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  }, [rsvps]);

  // Handlers
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setAudioTrigger(true);
    const url = new URL(window.location.href);
    url.searchParams.set('open', '1');
    window.history.pushState({}, '', url);
  };

  const handleAddComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const handleAddRsvp = (newRsvp) => {
    setRsvps((prev) => [newRsvp, ...prev]);
  };

  const handleDeleteRsvp = (rsvpId) => {
    setRsvps((prev) => prev.filter((r) => r.id !== rsvpId));
  };

  const handleUpdateWeddingData = (updatedData) => {
    setWeddingData(updatedData);
  };

  const scrollToGuestbook = () => {
    if (guestbookRef.current) {
      guestbookRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#e9eee6] flex flex-col items-center">
      {/* Envelope Modal (Cover Screen) */}
      <EnvelopeModal
        isOpen={!isEnvelopeOpen}
        onOpen={handleOpenEnvelope}
        data={weddingData}
      />

      {/* Top Floating Admin Pill Button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1F3A25] text-[#e8f0e4] hover:bg-[#152719] shadow-lg border border-[#e8f0e4]/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Mở bảng quản trị thiệp cưới"
        >
          <Settings className="w-3.5 h-3.5 text-amber-300" />
          <span>Quản trị thiệp</span>
        </button>
      </div>

      {/* Floating Audio Player */}
      <AudioPlayer autoPlayTrigger={audioTrigger} />

      {/* Main Wedding Invitation Frame (Center Max-Width Layout) */}
      <main className="w-full max-w-[480px] md:max-w-[768px] bg-[#fff7eb] shadow-2xl md:border md:border-[#1F3A25]/15 min-h-screen pb-20 relative overflow-x-hidden">
        {/* 1. Hero Section */}
        <HeroSection data={weddingData} />

        {/* 2. Ceremony Info Section */}
        <CeremonyInfo data={weddingData} />

        {/* 3. Photo Gallery 3D Coverflow */}
        <PhotoGallery gallery={weddingData.gallery} />

        {/* 4. Reception & Countdown & Calendar */}
        <ReceptionCountdown
          data={weddingData}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />

        {/* 5. Venue & Map */}
        <VenueMap data={weddingData} />

        {/* 6. Dress Code */}
        <DressCode dressCode={weddingData.dressCode} />

        {/* 7. Timeline */}
        <Timeline events={weddingData.timeline} />

        {/* 8. Guestbook with AI Wishes */}
        <div ref={guestbookRef}>
          <Guestbook
            comments={comments}
            onAddComment={handleAddComment}
            aiWishes={weddingData.aiWishes}
          />
        </div>

        {/* 9. Gift Box & VietQR */}
        <GiftBoxSection
          data={weddingData}
          onOpenModal={() => setIsGiftOpen(true)}
        />

        {/* Footer */}
        <footer className="w-full py-8 text-center bg-[#1F3A25] text-[#e8f0e4] border-t border-[#e8f0e4]/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl font-bold">囍</span>
          </div>
          <p className="font-serif-title text-base sm:text-lg font-medium tracking-wider">
            {weddingData.groom.shortName} & {weddingData.bride.shortName}
          </p>
          <p className="text-xs text-[#e8f0e4]/70 font-cormorant tracking-widest mt-1">
            THANK YOU FOR CELEBRATING WITH US
          </p>
          <p className="text-[10px] text-[#e8f0e4]/50 mt-4">
            Mẫu thiệp Song Hỷ Xanh • Thiết kế tinh tế & trang trọng
          </p>
        </footer>
      </main>

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onAddRsvp={handleAddRsvp}
        data={weddingData}
      />

      {/* Gift Box & VietQR Modal */}
      <GiftBoxModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
        data={weddingData}
      />

      {/* Admin / Customizer Drawer */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={weddingData}
        onUpdateData={handleUpdateWeddingData}
        rsvps={rsvps}
        onDeleteRsvp={handleDeleteRsvp}
        comments={comments}
        onDeleteComment={handleDeleteComment}
      />

      {/* Bottom Navigation Bar */}
      <Navbar
        onOpenEnvelope={() => {
          setIsEnvelopeOpen(false);
          const url = new URL(window.location.href);
          url.searchParams.delete('open');
          window.history.pushState({}, '', url);
        }}
        onOpenRsvp={() => setIsRsvpOpen(true)}
        onOpenGift={() => setIsGiftOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToGuestbook={scrollToGuestbook}
      />
    </div>
  );
}
