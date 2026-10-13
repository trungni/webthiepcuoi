# Hướng Dẫn Thay Đổi Thông Tin & Ảnh Cưới

Bạn có **3 cách cực kỳ dễ dàng** để thay đổi thông tin và ảnh cưới của bạn vào trang Web:

---

## 🚀 Cách 1: Thay đổi trực tiếp trên Giao Diện Web (Khuyên dùng - Nhanh nhất)

Bạn không cần mở file code nào, có thể thao tác ngay trên trình duyệt:

1. Mở trang web: **[http://localhost:3000/](http://localhost:3000/)**
2. Nhấn vào nút **"⚙ Quản trị thiệp"** ở góc trên bên phải màn hình (hoặc icon **Quản trị** ở thanh menu dưới cùng).
3. **Để thay ảnh cưới:**
   - Chuyển sang tab **"Ảnh Cưới"**.
   - Bấm nút **"Chọn ảnh từ máy tính..."** ở mục **Ảnh đại diện chính** để tải ảnh cưới vòm cung của bạn.
   - Bấm nút **"Đổi ảnh..."** ở 6 ô trong **Album Ảnh Cưới 3D** để tải 6 bức ảnh cưới từ máy tính của bạn.
   - Bấm **"Lưu Thay Đổi Hình Ảnh"**.
4. **Để thay đổi thông tin lễ cưới, dâu rể, ngân hàng:**
   - Chuyển sang tab **"Thông Tin Cưới"**.
   - Sửa họ tên Chú Rể, Cô Dâu, Ba Mẹ hai bên gia đình, địa chỉ nhà trai, nhà gái.
   - Sửa số tài khoản ngân hàng (Vietcombank, BIDV,...) và tên chủ tài khoản: Hệ thống sẽ **tự động sinh mã VietQR mới** tương ứng với STK của bạn!
   - Sửa ngày giờ tổ chức lễ gia tiên, giờ tiệc cưới, ngày âm lịch, tên trung tâm tiệc cưới và địa chỉ.
   - Bấm nút **"Lưu Thay Đổi"**.

---

## 📁 Cách 2: Copy ảnh vào thư mục `public/images/`

Nếu bạn muốn quản lý ảnh qua file trong dự án:

1. Chép các file ảnh cưới của bạn vào thư mục:
   ```
   e:\ANTIGRAVITY\WEB THIEP CUOI ONLINE\public\images\
   ```
   *(Ví dụ đặt tên: `hero.jpg`, `anh1.jpg`, `anh2.jpg`, `anh3.jpg`, `anh4.jpg`, `anh5.jpg`, `anh6.jpg`)*

2. Trong bảng Quản trị web hoặc trong file `src/data/weddingData.js`, bạn chỉ cần điền đường dẫn ảnh là:
   - Ảnh chính: `/images/hero.jpg`
   - Ảnh album: `/images/anh1.jpg`, `/images/anh2.jpg`,...

---

## 💻 Cách 3: Sửa trực tiếp trong file mã nguồn `src/data/weddingData.js`

Mở file:
👉 **[src/data/weddingData.js](file:///e:/ANTIGRAVITY/WEB%20THIEP%20CUOI%20ONLINE/src/data/weddingData.js)**

Tại đây bạn sẽ thấy cấu trúc dữ liệu rất rõ ràng:
- `groom`: Thông tin chú rể, ba mẹ, địa chỉ, tài khoản ngân hàng
- `bride`: Thông tin cô dâu, ba mẹ, địa chỉ, tài khoản ngân hàng
- `ceremony`: Giờ lành và địa điểm lễ gia tiên
- `banquet`: Giờ tiệc cưới, tên nhà hàng, địa chỉ, link Google Maps
- `heroPhoto`: Đường dẫn ảnh cưới đại diện vòm cung
- `gallery`: Danh sách 6 ảnh cưới hiển thị trong Album 3D
- `dressCode`: Bảng màu trang phục gợi ý
- `timeline`: Lịch trình các mốc giờ trong tiệc cưới
- `aiWishes`: Danh sách các câu chúc mẫu gợi ý bằng AI
