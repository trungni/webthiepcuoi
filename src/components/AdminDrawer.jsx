import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Users,
  MessageSquare,
  Edit3,
  Share2,
  Download,
  Trash2,
  Check,
  Copy,
  Image as ImageIcon,
  Upload,
  Calendar,
  Clock,
  RotateCcw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { initialWeddingData } from '../data/weddingData';
import { compressImage } from '../utils/imageCompressor';

export const AdminDrawer = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  rsvps = [],
  onDeleteRsvp,
  comments = [],
  onDeleteComment
}) => {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos', 'edit', 'rsvp', 'wishes', 'share'
  const [formData, setFormData] = useState(data);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState(null); // 'hero', 'gallery-0', etc.
  const [uploadError, setUploadError] = useState('');

  // Keep formData in sync with latest data
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data, isOpen]);

  if (!isOpen) return null;

  // Calculate RSVP Statistics
  const attendingRsvps = rsvps.filter((r) => r.attending);
  const totalAttendingGuests = attendingRsvps.reduce((sum, r) => sum + (r.guestCount || 1), 0);
  const groomSideGuests = attendingRsvps.filter((r) => r.side === 'groom').reduce((sum, r) => sum + (r.guestCount || 1), 0);
  const brideSideGuests = attendingRsvps.filter((r) => r.side === 'bride').reduce((sum, r) => sum + (r.guestCount || 1), 0);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Họ tên', 'Số điện thoại', 'Khách của', 'Tham dự', 'Số lượng khách', 'Ghi chú', 'Thời gian'];
    const rows = rsvps.map((r) => [
      `"${r.name}"`,
      `"${r.phone || ''}"`,
      r.side === 'groom' ? 'Nhà Trai' : 'Nhà Gái',
      r.attending ? 'Có' : 'Không',
      r.guestCount || 0,
      `"${r.note || ''}"`,
      `"${r.timestamp || ''}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Danh_sach_khach_moi_${data.groom.shortName}_${data.bride.shortName}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Safe file upload with canvas compression
  const handleFileUpload = async (e, targetType, galleryIndex = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const targetKey = galleryIndex !== null ? `gallery-${galleryIndex}` : targetType;
    setUploadingTarget(targetKey);
    setUploadError('');

    try {
      // Compress image client-side to ~80-120KB to fit easily into localStorage without quota errors
      const compressedBase64 = await compressImage(file, 1200, 0.78);

      let updatedData = { ...formData };
      if (targetType === 'hero') {
        updatedData = { ...updatedData, heroPhoto: compressedBase64 };
      } else if (targetType === 'gallery' && galleryIndex !== null) {
        const newGallery = [...updatedData.gallery];
        newGallery[galleryIndex] = { ...newGallery[galleryIndex], url: compressedBase64 };
        updatedData = { ...updatedData, gallery: newGallery };
      }

      setFormData(updatedData);
      onUpdateData(updatedData); // Apply directly to website

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error('Lỗi nén/tải ảnh:', err);
      setUploadError('Không thể xử lý ảnh này: ' + (err.message || 'Lỗi tệp không hợp lệ'));
    } finally {
      setUploadingTarget(null);
      e.target.value = ''; // Reset file input
    }
  };

  const handleSaveData = (e) => {
    if (e) e.preventDefault();
    onUpdateData(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục toàn bộ thông tin về dữ liệu mặc định ngày 17/11/2026?')) {
      setFormData(initialWeddingData);
      onUpdateData(initialWeddingData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden text-gray-800">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-[#1F3A25] text-[#e8f0e4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif-title text-xl font-bold tracking-wide">
              Bảng Quản Trị & Tùy Chỉnh Thiệp
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs sm:text-sm font-semibold shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'photos'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-emerald-700" />
            <span>Ảnh Cưới</span>
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'edit'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Edit3 className="w-4 h-4 text-blue-700" />
            <span>Thông Tin Cưới</span>
          </button>
          <button
            onClick={() => setActiveTab('rsvp')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'rsvp'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Users className="w-4 h-4 text-amber-700" />
            <span>Khách Mời ({rsvps.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('wishes')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'wishes'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-700" />
            <span>Lời Chúc ({comments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'share'
                ? 'border-b-2 border-[#1F3A25] text-[#1F3A25] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Share2 className="w-4 h-4 text-rose-700" />
            <span>Chia Sẻ</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-gray-50/50">
          {/* TAB: PHOTOS MANAGEMENT */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {savedSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold rounded-xl text-center shadow-xs animate-in fade-in">
                  Đã cập nhật và lưu hình ảnh cưới thành công! ✨
                </div>
              )}

              {uploadError && (
                <div className="p-3 bg-red-100 text-red-700 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 leading-relaxed">
                📸 <strong>Tải ảnh trực tiếp từ máy tính:</strong> Bạn có thể chọn bất kỳ ảnh JPG, PNG nào từ máy tính của bạn. Hệ thống sẽ tự động tối ưu hoá kích thước và hiển thị ngay trên website!
              </div>

              {/* 1. HERO PHOTO */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h4 className="font-bold text-base text-[#1F3A25]">
                    1. Ảnh Đại Diện Chính (Khung Vòm Cung Đầu Trang)
                  </h4>
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Hero Arch Photo
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-28 h-40 shrink-0 rounded-t-full overflow-hidden border-2 border-[#1F3A25] bg-gray-100 shadow-md relative">
                    <img
                      src={formData.heroPhoto}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                    {uploadingTarget === 'hero' && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs gap-1">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Đang tải...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        Tải ảnh từ máy tính của bạn:
                      </label>
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1F3A25] text-white rounded-xl text-xs font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm">
                        {uploadingTarget === 'hero' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Đang nén & lưu ảnh...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Chọn ảnh từ máy tính...</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingTarget !== null}
                          onChange={(e) => handleFileUpload(e, 'hero')}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        Hoặc nhập link ảnh (URL hoặc /images/...):
                      </label>
                      <input
                        type="text"
                        value={formData.heroPhoto}
                        onChange={(e) => {
                          const updated = { ...formData, heroPhoto: e.target.value };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                        placeholder="https://... hoặc /images/hero.jpg"
                        className="w-full text-xs p-2.5 border rounded-xl font-mono text-gray-700 bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GALLERY 6 PHOTOS */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h4 className="font-bold text-base text-[#1F3A25]">
                    2. Album Ảnh Cưới 3D ({formData.gallery.length} bức ảnh)
                  </h4>
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    3D Coverflow Gallery
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.gallery.map((photo, idx) => {
                    const isUploadingThis = uploadingTarget === `gallery-${idx}`;
                    return (
                      <div
                        key={photo.id || idx}
                        className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 flex flex-col gap-2.5 shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-22 shrink-0 rounded-lg overflow-hidden border border-gray-300 bg-gray-200 shadow-xs relative">
                            <img
                              src={photo.url}
                              alt={`Photo ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {isUploadingThis && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                                <Loader2 className="w-4 h-4 animate-spin" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-[#1F3A25] block mb-1">
                              Ảnh số {idx + 1}
                            </span>
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-[11px] font-semibold hover:bg-gray-100 active:scale-95 transition-all cursor-pointer shadow-xs">
                              {isUploadingThis ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin text-[#1F3A25]" />
                                  <span>Đang tải...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-3 h-3 text-[#1F3A25]" />
                                  <span>Đổi ảnh từ máy...</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                disabled={uploadingTarget !== null}
                                onChange={(e) => handleFileUpload(e, 'gallery', idx)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={photo.url}
                            onChange={(e) => {
                              const newGallery = [...formData.gallery];
                              newGallery[idx] = { ...newGallery[idx], url: e.target.value };
                              const updated = { ...formData, gallery: newGallery };
                              setFormData(updated);
                              onUpdateData(updated);
                            }}
                            placeholder="Link ảnh hoặc /images/..."
                            className="w-full text-[11px] p-2 border rounded-lg font-mono text-gray-600 bg-white"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveData}
                  className="w-full py-3 bg-[#1F3A25] text-white font-bold rounded-xl shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Thay Đổi Hình Ảnh</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: EDIT WEDDING DATA */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSaveData} className="space-y-6">
              {savedSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold rounded-xl text-center shadow-xs">
                  Đã lưu các thông tin cưới thành công! ✨
                </div>
              )}

              {/* 1. LỄ THÀNH HÔN & TIỆC CƯỚI (NGÀY 17/11/2026) */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h5 className="font-bold text-sm text-[#1F3A25] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Thời Gian & Địa Điểm Tiệc Cưới (17/11/2026)</span>
                  </h5>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                    17/11/2026
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-500 block">Thứ</label>
                    <input
                      type="text"
                      value={formData.banquet.dayOfWeek}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          banquet: { ...formData.banquet, dayOfWeek: e.target.value },
                          ceremony: { ...formData.ceremony, dayOfWeek: e.target.value }
                        })
                      }
                      className="w-full text-xs p-1.5 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block">Ngày</label>
                    <input
                      type="text"
                      value={formData.banquet.day}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          banquet: { ...formData.banquet, day: e.target.value },
                          ceremony: { ...formData.ceremony, day: e.target.value }
                        })
                      }
                      className="w-full text-xs p-1.5 border rounded-lg font-bold text-[#1F3A25]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block">Tháng</label>
                    <input
                      type="text"
                      value={formData.banquet.month}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          banquet: { ...formData.banquet, month: e.target.value },
                          ceremony: { ...formData.ceremony, month: e.target.value }
                        })
                      }
                      className="w-full text-xs p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block">Năm</label>
                    <input
                      type="text"
                      value={formData.banquet.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          banquet: { ...formData.banquet, year: e.target.value },
                          ceremony: { ...formData.ceremony, year: e.target.value }
                        })
                      }
                      className="w-full text-xs p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Giờ cử hành hôn lễ (Gia tiên)
                    </label>
                    <input
                      type="text"
                      value={formData.ceremony.time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ceremony: { ...formData.ceremony, time: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Giờ khai tiệc cưới (Nhà hàng)
                    </label>
                    <input
                      type="text"
                      value={formData.banquet.time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          banquet: { ...formData.banquet, time: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Ngày Âm Lịch
                  </label>
                  <input
                    type="text"
                    value={formData.banquet.lunarDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        banquet: { ...formData.banquet, lunarDate: e.target.value },
                        ceremony: { ...formData.ceremony, lunarDate: e.target.value }
                      })
                    }
                    className="w-full text-xs p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Tên Nhà hàng / Trung tâm tiệc cưới
                  </label>
                  <input
                    type="text"
                    value={formData.banquet.venueName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        banquet: { ...formData.banquet, venueName: e.target.value }
                      })
                    }
                    className="w-full text-xs p-2 border rounded-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Địa chỉ tiệc cưới
                  </label>
                  <input
                    type="text"
                    value={formData.banquet.venueAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        banquet: { ...formData.banquet, venueAddress: e.target.value }
                      })
                    }
                    className="w-full text-xs p-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* 2. CHÚ RỂ & NHÀ TRAI */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h5 className="font-bold text-sm text-blue-900">
                    Chú Rể & Nhà Trai
                  </h5>
                  <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                    Nhà Trai
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Họ và tên Chú Rể
                    </label>
                    <input
                      type="text"
                      value={formData.groom.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, fullName: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Tên gọi ngắn / Tên riêng
                    </label>
                    <input
                      type="text"
                      value={formData.groom.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, shortName: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Họ tên Ba Chú Rể
                    </label>
                    <input
                      type="text"
                      value={formData.groom.father}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, father: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Họ tên Mẹ Chú Rể
                    </label>
                    <input
                      type="text"
                      value={formData.groom.mother}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, mother: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Địa chỉ Nhà Trai
                  </label>
                  <input
                    type="text"
                    value={formData.groom.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        groom: { ...formData.groom, address: e.target.value }
                      })
                    }
                    className="w-full text-xs p-2 border rounded-lg"
                  />
                </div>

                {/* Tài khoản ngân hàng Chú Rể */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-700 block mb-2">
                    Tài khoản ngân hàng mừng cưới (Chú Rể):
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-500 block">
                        Ngân hàng
                      </label>
                      <input
                        type="text"
                        value={formData.groom.bank.bankName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groom: {
                              ...formData.groom,
                              bank: { ...formData.groom.bank, bankName: e.target.value }
                            }
                          })
                        }
                        className="w-full text-xs p-1.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 block">
                        Số tài khoản
                      </label>
                      <input
                        type="text"
                        value={formData.groom.bank.accountNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groom: {
                              ...formData.groom,
                              bank: {
                                ...formData.groom.bank,
                                accountNumber: e.target.value,
                                qrUrl: `https://img.vietqr.io/image/${formData.groom.bank.bankCode}-${e.target.value}-compact2.png?amount=0&addInfo=Mung%20cuoi%20${encodeURIComponent(formData.groom.shortName)}&accountName=${encodeURIComponent(formData.groom.bank.accountName)}`
                              }
                            }
                          })
                        }
                        className="w-full text-xs p-1.5 border rounded-lg font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 block">
                        Tên chủ TK
                      </label>
                      <input
                        type="text"
                        value={formData.groom.bank.accountName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groom: {
                              ...formData.groom,
                              bank: { ...formData.groom.bank, accountName: e.target.value }
                            }
                          })
                        }
                        className="w-full text-xs p-1.5 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. CÔ DÂU & NHÀ GÁI */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h5 className="font-bold text-sm text-rose-900">
                    Cô Dâu & Nhà Gái
                  </h5>
                  <span className="text-[11px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-semibold">
                    Nhà Gái
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Họ và tên Cô Dâu
                    </label>
                    <input
                      type="text"
                      value={formData.bride.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, fullName: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Tên gọi ngắn / Tên riêng
                    </label>
                    <input
                      type="text"
                      value={formData.bride.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, shortName: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Họ tên Ba Cô Dâu
                    </label>
                    <input
                      type="text"
                      value={formData.bride.father}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, father: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Họ tên Mẹ Cô Dâu
                    </label>
                    <input
                      type="text"
                      value={formData.bride.mother}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, mother: e.target.value }
                        })
                      }
                      className="w-full text-xs p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Địa chỉ Nhà Gái
                  </label>
                  <input
                    type="text"
                    value={formData.bride.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bride: { ...formData.bride, address: e.target.value }
                      })
                    }
                    className="w-full text-xs p-2 border rounded-lg"
                  />
                </div>

                {/* Tài khoản ngân hàng Cô Dâu */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-700 block mb-2">
                    Tài khoản ngân hàng mừng cưới (Cô Dâu):
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-500 block">
                        Ngân hàng
                      </label>
                      <input
                        type="text"
                        value={formData.bride.bank.bankName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bride: {
                              ...formData.bride,
                              bank: { ...formData.bride.bank, bankName: e.target.value }
                            }
                          })
                        }
                        className="w-full text-xs p-1.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 block">
                        Số tài khoản
                      </label>
                      <input
                        type="text"
                        value={formData.bride.bank.accountNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bride: {
                              ...formData.bride,
                              bank: {
                                ...formData.bride.bank,
                                accountNumber: e.target.value,
                                qrUrl: `https://img.vietqr.io/image/${formData.bride.bank.bankCode}-${e.target.value}-compact2.png?amount=0&addInfo=Mung%20cuoi%20${encodeURIComponent(formData.bride.shortName)}&accountName=${encodeURIComponent(formData.bride.bank.accountName)}`
                              }
                            }
                          })
                        }
                        className="w-full text-xs p-1.5 border rounded-lg font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 block">
                        Tên chủ TK
                      </label>
                      <input
                        type="text"
                        value={formData.bride.bank.accountName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bride: {
                              ...formData.bride,
                              bank: { ...formData.bride.bank, accountName: e.target.value }
                            }
                          })
                        }
                        className="w-full text-xs p-1.5 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all flex items-center gap-1.5 text-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục mẫu 17/11</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1F3A25] text-white font-bold rounded-xl shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Thay Đổi Thông Tin</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB: RSVP */}
          {activeTab === 'rsvp' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs text-center">
                  <span className="text-[11px] text-gray-500 block uppercase">
                    Tổng phản hồi
                  </span>
                  <span className="text-2xl font-bold text-[#1F3A25]">{rsvps.length}</span>
                </div>
                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 shadow-xs text-center">
                  <span className="text-[11px] text-emerald-700 block uppercase">
                    Tổng khách đến
                  </span>
                  <span className="text-2xl font-bold text-emerald-800">
                    {totalAttendingGuests}
                  </span>
                </div>
                <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 shadow-xs text-center">
                  <span className="text-[11px] text-blue-700 block uppercase">
                    Nhà Trai
                  </span>
                  <span className="text-2xl font-bold text-blue-800">
                    {groomSideGuests}
                  </span>
                </div>
                <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 shadow-xs text-center">
                  <span className="text-[11px] text-rose-700 block uppercase">
                    Nhà Gái
                  </span>
                  <span className="text-2xl font-bold text-rose-800">
                    {brideSideGuests}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h4 className="font-bold text-base text-[#1F3A25]">
                  Danh sách phản hồi xác nhận
                </h4>
                <button
                  onClick={handleExportCSV}
                  disabled={rsvps.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F3A25] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-40 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất Excel/CSV</span>
                </button>
              </div>

              <div className="space-y-3">
                {rsvps.length === 0 ? (
                  <p className="text-center text-sm text-gray-400 py-8">
                    Chưa có lượt xác nhận RSVP nào.
                  </p>
                ) : (
                  rsvps.map((rsvp) => (
                    <div
                      key={rsvp.id}
                      className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{rsvp.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              rsvp.side === 'groom'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {rsvp.side === 'groom' ? 'Nhà Trai' : 'Nhà Gái'}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              rsvp.attending
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {rsvp.attending
                              ? `Tham dự (${rsvp.guestCount} người)`
                              : 'Không thể đến'}
                          </span>
                        </div>
                        {rsvp.phone && (
                          <p className="text-xs text-gray-500 font-mono">
                            SĐT: {rsvp.phone}
                          </p>
                        )}
                        {rsvp.note && (
                          <p className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded-lg mt-1">
                            "{rsvp.note}"
                          </p>
                        )}
                        <p className="text-[10px] text-gray-400">{rsvp.timestamp}</p>
                      </div>

                      <button
                        onClick={() => onDeleteRsvp(rsvp.id)}
                        className="self-end sm:self-center p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Xoá phản hồi này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: WISHES */}
          {activeTab === 'wishes' && (
            <div className="space-y-4">
              <h4 className="font-bold text-base text-[#1F3A25]">
                Quản lý lời chúc trong Sổ Lưu Bút ({comments.length})
              </h4>
              {comments.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">
                  Chưa có lời chúc nào.
                </p>
              ) : (
                comments.map((cm) => (
                  <div
                    key={cm.id}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{cm.name}</span>
                        <span className="text-[10px] text-gray-400">{cm.timestamp}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 mt-1.5 whitespace-pre-line leading-relaxed">
                        {cm.message}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteComment(cm.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                      title="Xoá lời chúc"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: SHARE */}
          {activeTab === 'share' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-5">
              <h4 className="font-bold text-lg text-[#1F3A25]">
                Chia sẻ thiệp cưới tới khách mời
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Gửi đường dẫn thiệp cưới trực tuyến qua tin nhắn Zalo, Facebook, SMS hoặc quét mã QR dưới đây:
              </p>

              <div className="w-48 h-48 mx-auto bg-gray-50 p-3 rounded-2xl border border-gray-200 shadow-inner flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    window.location.href
                  )}`}
                  alt="QR chia sẻ thiệp"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center gap-2 max-w-md mx-auto">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 text-xs p-2.5 border rounded-xl bg-gray-50 text-gray-600 font-mono select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 bg-[#1F3A25] text-white text-xs font-bold rounded-xl hover:opacity-90 flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Đã copy!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
