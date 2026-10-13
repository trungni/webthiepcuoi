/**
 * Compress an image file using an offscreen canvas
 * @param {File} file - User uploaded image file
 * @param {number} maxWidth - Maximum width or height (default 1200px)
 * @param {number} quality - JPEG compression quality 0.0 - 1.0 (default 0.78)
 * @returns {Promise<string>} Base64 Data URL of compressed image
 */
export const compressImage = (file, maxWidth = 1200, quality = 0.78) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, WebP)'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = (err) => reject(err);
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down if larger than maxWidth
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target.result); // Fallback to raw if canvas context unavailable
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed JPEG data URL
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          resolve(e.target.result);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
