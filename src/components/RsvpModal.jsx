import React, { useState } from 'react';
import { X, CheckCircle, UserCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RsvpModal = ({ isOpen, onClose, onAddRsvp, data }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [side, setSide] = useState('groom'); // 'groom' or 'bride'
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRsvp = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      side,
      attending,
      guestCount: attending ? Number(guestCount) : 0,
      note: note.trim(),
      timestamp: new Date().toLocaleString('vi-VN')
    };

    onAddRsvp(newRsvp);

    if (attending) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setName('');
      setPhone('');
      setNote('');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fff7eb] rounded-3xl overflow-hidden shadow-2xl border border-[#1F3A25]/20 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="relative py-4 px-6 bg-[#1F3A25] text-center text-[#e8f0e4]">
          <h3 className="font-serif-title text-xl sm:text-2xl font-bold uppercase tracking-wider">
            Xác Nhận Tham Dự
          </h3>
          <p className="text-[11px] sm:text-xs text-[#e8f0e4]/80 mt-1 font-sans max-w-xs mx-auto leading-relaxed">
            Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!
          </p>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
              <CheckCircle className="w-16 h-16 text-emerald-600 animate-bounce" />
              <h4 className="text-xl font-bold font-serif-title text-[#1F3A25]">
                Đã gửi phản hồi thành công!
              </h4>
              <p className="text-sm text-[#555555] max-w-xs font-sans">
                {attending
                  ? `Cảm ơn bạn! Hẹn gặp lại bạn vào ngày 30/07/2026 tại Gala Center nhé!`
                  : `Cảm ơn bạn đã phản hồi! Dâu rể xin ghi nhận tấm lòng của bạn!`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-[#1F3A25]">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A25] mb-1 font-sans">
                  Tên của bạn *
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1F3A25] focus:ring-2 focus:ring-[#1F3A25]/20 outline-none text-sm text-[#1F3A25] bg-white font-sans"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A25] mb-1 font-sans">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  placeholder="Số điện thoại của bạn..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1F3A25] focus:ring-2 focus:ring-[#1F3A25]/20 outline-none text-sm text-[#1F3A25] bg-white font-sans"
                />
              </div>

              {/* Guest Of */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A25] mb-1.5 font-sans">
                  Bạn là khách của *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSide('groom')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      side === 'groom'
                        ? 'bg-[#1F3A25] text-[#e8f0e4] border-[#1F3A25] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Khách Nhà Trai ({data.groom.shortName})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSide('bride')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      side === 'bride'
                        ? 'bg-[#1F3A25] text-[#e8f0e4] border-[#1F3A25] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Khách Nhà Gái ({data.bride.shortName})
                  </button>
                </div>
              </div>

              {/* Attending Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A25] mb-1.5 font-sans">
                  Bạn sẽ tham dự chứ? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      attending
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>Có, tôi sẽ đến 🎉</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      !attending
                        ? 'bg-gray-700 text-white border-gray-700 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>Rất tiếc không thể đến 💌</span>
                  </button>
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {attending && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A25] mb-1 font-sans">
                    Số người tham dự
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1F3A25] focus:ring-2 focus:ring-[#1F3A25]/20 outline-none text-sm text-[#1F3A25] bg-white font-sans"
                  >
                    <option value={1}>Đi 1 người (Tôi đi một mình)</option>
                    <option value={2}>Đi 2 người (+1 người thân/bạn)</option>
                    <option value={3}>Đi 3 người</option>
                    <option value={4}>Đi cùng gia đình (4 người)</option>
                  </select>
                </div>
              )}

              {/* Note / Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A25] mb-1 font-sans">
                  Lời nhắn gửi riêng
                </label>
                <textarea
                  placeholder="Ghi chú thêm (vd: cần xe đưa đón, dị ứng thực phẩm,...)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#1F3A25] focus:ring-2 focus:ring-[#1F3A25]/20 outline-none text-sm text-[#1F3A25] bg-white font-sans resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-serif-title text-base font-bold text-[#e8f0e4] bg-[#1F3A25] hover:opacity-90 active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  XÁC NHẬN GỬI
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
