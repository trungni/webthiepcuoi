import React, { useState } from 'react';
import { Gift, Copy, Check, X, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GiftBoxSection = ({ data, onOpenModal }) => {
  const handleClick = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#1F3A25', '#8B9A6B', '#ec4899', '#facc15', '#3b82f6']
      });
    } catch (e) {}
    onOpenModal();
  };

  return (
    <section className="w-full bg-[#fff7eb] py-10 border-t border-[#1F3A25]/10 text-center">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-[#1F3A25] font-serif-title mb-6">
          Hộp Quà Mừng
        </h2>

        {/* Interactive 3D Gift Box Container */}
        <div
          onClick={handleClick}
          className="relative inline-flex flex-col items-center justify-center p-6 cursor-pointer group select-none transition-transform hover:scale-105 active:scale-95"
          title="Nhấn để mở hộp mừng cưới"
        >
          {/* Sparkles around */}
          <span className="absolute top-2 left-6 text-amber-500 text-xl animate-pulse">✦</span>
          <span className="absolute top-8 right-6 text-emerald-600 text-lg animate-pulse" style={{ animationDelay: '0.4s' }}>✦</span>
          <span className="absolute bottom-8 left-4 text-emerald-500 text-sm animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
          <span className="absolute bottom-10 right-4 text-amber-400 text-base animate-pulse" style={{ animationDelay: '1.2s' }}>✦</span>

          {/* 3D Gift Box Illustration */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center animate-float-box">
            {/* Soft Shadow */}
            <div className="absolute bottom-1 w-28 h-4 rounded-full bg-black/15 blur-xs" />

            {/* Gift Box Graphics */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-[#284a30] to-[#122418] shadow-2xl border border-[#e8f0e4]/30 flex flex-col items-center justify-center overflow-hidden">
              {/* Ribbon Ribs */}
              <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-md"></div>
              <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-400 shadow-md"></div>

              {/* Bow Ribbon */}
              <div className="absolute -top-3 w-12 h-8 rounded-full border-4 border-amber-300 bg-amber-400/30 shadow-lg"></div>

              {/* Center 囍 Stamp */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-[#1F3A25] border-2 border-amber-300 flex items-center justify-center shadow-lg">
                <span className="text-amber-200 font-bold text-sm">囍</span>
              </div>
            </div>
          </div>

          {/* Hint Text */}
          <p className="mt-2 text-xs sm:text-sm font-semibold text-[#1F3A25] tracking-wider font-serif-title bg-[#1F3A25]/10 px-4 py-1.5 rounded-full group-hover:bg-[#1F3A25] group-hover:text-[#e8f0e4] transition-colors">
            Nhấn để mở hộp mừng
          </p>
        </div>
      </div>
    </section>
  );
};

export const GiftBoxModal = ({ isOpen, onClose, data }) => {
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'groom', 'bride'

  if (!isOpen) return null;

  const copyToClipboard = (text, isGroom) => {
    navigator.clipboard.writeText(text);
    if (isGroom) {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2500);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fff7eb] rounded-3xl overflow-hidden shadow-2xl border border-[#1F3A25]/20 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="relative py-4 px-6 bg-[#1F3A25] text-center text-[#e8f0e4]">
          <h3 className="font-serif-title text-xl sm:text-2xl font-bold uppercase tracking-wider">
            Hộp Quà Mừng
          </h3>
          <p className="text-[11px] sm:text-xs text-[#e8f0e4]/80 mt-0.5 font-sans">
            Gửi gắm tình cảm và lời chúc phúc đến cô dâu chú rể
          </p>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#1F3A25]/10 bg-white/50 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2.5 transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] font-bold bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Cả hai bạn
          </button>
          <button
            onClick={() => setActiveTab('groom')}
            className={`flex-1 py-2.5 transition-colors cursor-pointer ${
              activeTab === 'groom'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] font-bold bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Chú Rể ({data.groom.shortName})
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={`flex-1 py-2.5 transition-colors cursor-pointer ${
              activeTab === 'bride'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] font-bold bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Cô Dâu ({data.bride.shortName})
          </button>
        </div>

        {/* Body Content with Bank Cards */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Groom Bank Card */}
          {(activeTab === 'all' || activeTab === 'groom') && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#1F3A25]/15">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Chú Rể
                  </span>
                  <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A25] mt-1">
                    {data.groom.fullName}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#1F3A25]">
                    {data.groom.bank.bankName}
                  </span>
                </div>
              </div>

              {/* QR and Details Layout */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                {/* QR Image */}
                <div className="w-36 h-36 shrink-0 bg-white p-2 rounded-xl border border-gray-200 shadow-inner flex items-center justify-center">
                  <img
                    src={data.groom.bank.qrUrl}
                    alt="VietQR Chú Rể"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Account Details */}
                <div className="flex-1 text-center sm:text-left space-y-2 w-full">
                  <div>
                    <span className="text-[11px] text-gray-500 block">Số tài khoản:</span>
                    <span className="font-mono text-base sm:text-lg font-bold text-[#1F3A25] tracking-wider">
                      {data.groom.bank.accountNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Chủ tài khoản:</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                      {data.groom.bank.accountName}
                    </span>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => copyToClipboard(data.groom.bank.accountNumber, true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1F3A25] text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    >
                      {copiedGroom ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép STK</span>
                        </>
                      )}
                    </button>

                    <a
                      href={data.groom.bank.qrUrl}
                      download={`VietQR_ChuRe_${data.groom.shortName}.png`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải QR</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bride Bank Card */}
          {(activeTab === 'all' || activeTab === 'bride') && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#1F3A25]/15">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-rose-800 font-semibold bg-rose-50 px-2 py-0.5 rounded-md">
                    Cô Dâu
                  </span>
                  <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A25] mt-1">
                    {data.bride.fullName}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#1F3A25]">
                    {data.bride.bank.bankName}
                  </span>
                </div>
              </div>

              {/* QR and Details Layout */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                {/* QR Image */}
                <div className="w-36 h-36 shrink-0 bg-white p-2 rounded-xl border border-gray-200 shadow-inner flex items-center justify-center">
                  <img
                    src={data.bride.bank.qrUrl}
                    alt="VietQR Cô Dâu"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Account Details */}
                <div className="flex-1 text-center sm:text-left space-y-2 w-full">
                  <div>
                    <span className="text-[11px] text-gray-500 block">Số tài khoản:</span>
                    <span className="font-mono text-base sm:text-lg font-bold text-[#1F3A25] tracking-wider">
                      {data.bride.bank.accountNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Chủ tài khoản:</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                      {data.bride.bank.accountName}
                    </span>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => copyToClipboard(data.bride.bank.accountNumber, false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1F3A25] text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    >
                      {copiedBride ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép STK</span>
                        </>
                      )}
                    </button>

                    <a
                      href={data.bride.bank.qrUrl}
                      download={`VietQR_CoDau_${data.bride.shortName}.png`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải QR</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
