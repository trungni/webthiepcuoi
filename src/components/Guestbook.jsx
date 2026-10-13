import React, { useState } from 'react';
import { Sparkles, Send, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Guestbook = ({ comments = [], onAddComment, aiWishes = [] }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // AI Wish Generator button
  const handleGenerateAiWish = () => {
    if (aiWishes.length === 0) return;
    const randomWish = aiWishes[Math.floor(Math.random() * aiWishes.length)];
    setMessage(randomWish);

    // Small sparkle feedback
    showToast('Đã tạo gợi ý lời chúc bằng AI ✨');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const newComment = {
      id: `cm-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      timestamp: formattedDate
    };

    onAddComment(newComment);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#1F3A25', '#8B9A6B', '#e8f0e4', '#f59e0b']
      });
    } catch (err) {
      // ignore if confetti fails
    }

    setName('');
    setMessage('');
    setIsSubmitting(false);
    showToast('Cảm ơn bạn đã gửi lời chúc tốt đẹp! 💖');
  };

  return (
    <section className="w-full bg-[#fff7eb] pb-12">
      {/* Title Header */}
      <div className="w-full py-3.5 sm:py-4 bg-[#1F3A25] shadow-sm">
        <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-widest text-[#e8f0e4] font-serif-title">
          Sổ Lưu Bút
        </h2>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-6">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="mb-4 p-3 bg-[#1F3A25] text-[#e8f0e4] text-xs sm:text-sm font-medium rounded-xl text-center shadow-lg animate-in fade-in">
            {toastMsg}
          </div>
        )}

        {/* Input Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#1F3A25]/10">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nhập tên của bạn*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1F3A25] focus:ring-2 focus:ring-[#1F3A25]/20 outline-none text-sm text-[#1F3A25] font-sans placeholder-gray-400"
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Nhập lời chúc của bạn*"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1F3A25] focus:ring-2 focus:ring-[#1F3A25]/20 outline-none text-sm text-[#1F3A25] font-sans placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-1">
            {/* AI Generator Button */}
            <button
              type="button"
              onClick={handleGenerateAiWish}
              title="Gợi ý lời chúc bằng AI"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all bg-[#1F3A25]/10 text-[#1F3A25] hover:bg-[#1F3A25]/20 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Gợi ý bằng AI</span>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="px-6 py-2.5 rounded-full text-[#e8f0e4] bg-[#1F3A25] font-medium text-xs sm:text-sm uppercase tracking-wider transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>GỬI LỜI CHÚC</span>
            </button>
          </div>
        </form>

        {/* Wishes List */}
        <div className="mt-8 space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
          {comments.length === 0 ? (
            <p className="text-center text-sm text-[#777777] italic py-4">
              Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc tới dâu rể nhé!
            </p>
          ) : (
            comments.map((cm) => (
              <div
                key={cm.id}
                className="bg-white rounded-xl p-4 shadow-xs border border-gray-100 transition-all hover:shadow-sm"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                  <span className="font-serif-title font-semibold text-base sm:text-lg text-[#1F3A25]">
                    {cm.name}
                  </span>
                  <span className="text-[11px] text-gray-400 font-sans">
                    {cm.timestamp}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#444444] leading-relaxed font-sans whitespace-pre-line">
                  {cm.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
