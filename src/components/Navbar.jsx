import React from 'react';
import { Mail, Gift, MessageCircleHeart, CheckCircle, Settings } from 'lucide-react';

export const Navbar = ({ onOpenEnvelope, onOpenRsvp, onOpenGift, onOpenAdmin, onScrollToGuestbook }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-[#1F3A25]/15 py-2 px-3 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Envelope Re-open */}
        <button
          onClick={onOpenEnvelope}
          className="flex flex-col items-center gap-1 text-[#1F3A25] hover:opacity-75 transition-all p-1 cursor-pointer"
          title="Xem lại phong bì"
        >
          <Mail className="w-5 h-5 text-[#1F3A25]" />
          <span className="text-[10px] font-semibold">Bì thư</span>
        </button>

        {/* RSVP Action */}
        <button
          onClick={onOpenRsvp}
          className="flex flex-col items-center gap-1 text-[#1F3A25] hover:opacity-75 transition-all p-1 cursor-pointer"
          title="Xác nhận tham dự"
        >
          <CheckCircle className="w-5 h-5 text-[#1F3A25]" />
          <span className="text-[10px] font-semibold">RSVP</span>
        </button>

        {/* Gift Box Action */}
        <button
          onClick={onOpenGift}
          className="flex flex-col items-center gap-1 text-[#1F3A25] hover:opacity-75 transition-all p-1 cursor-pointer"
          title="Mừng cưới"
        >
          <Gift className="w-5 h-5 text-[#1F3A25]" />
          <span className="text-[10px] font-semibold">Mừng cưới</span>
        </button>

        {/* Guestbook Wishes */}
        <button
          onClick={onScrollToGuestbook}
          className="flex flex-col items-center gap-1 text-[#1F3A25] hover:opacity-75 transition-all p-1 cursor-pointer"
          title="Gửi lời chúc"
        >
          <MessageCircleHeart className="w-5 h-5 text-[#1F3A25]" />
          <span className="text-[10px] font-semibold">Lời chúc</span>
        </button>

        {/* Admin Settings */}
        <button
          onClick={onOpenAdmin}
          className="flex flex-col items-center gap-1 text-[#1F3A25] hover:opacity-75 transition-all p-1 cursor-pointer"
          title="Quản trị"
        >
          <Settings className="w-5 h-5 text-[#1F3A25]" />
          <span className="text-[10px] font-semibold">Quản trị</span>
        </button>
      </div>
    </nav>
  );
};
