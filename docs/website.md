# Vũ Tiến Dũng

Trang hồ sơ cá nhân bằng HTML, CSS và JavaScript thuần. Không cần build hay cài thư viện để chạy.

## Xem tại máy

Mở thư mục bằng VS Code và chạy **Live Server** từ `index.html`. Dùng HTTP để trình duyệt có thể tải ảnh vào WebGL. Nếu mở trực tiếp file HTML, trang vẫn có nền ảnh và các liên kết.

## Giao diện và chuyển động

- Vườn hoa 3D dày hơn bản mẫu. Cuộn chuột, vuốt hoặc nhấn Page Down / Page Up để đi qua các cụm hoa đang nở. Đường đi lặp liên tục.
- Rê chuột lên hoa để làm sáng các cánh hoa, tạo quầng sáng và chuyển động có quán tính; vùng tác động mờ dần khi con trỏ rời đi.
- Mobile giữ tên trên một dòng, hai cột liên kết và khoảng cách nội dung gọn.
- Nút hình ngôi sao ở chân trang bật/tắt chuyển động. Trang tự tắt chuyển động khi hệ điều hành yêu cầu giảm chuyển động.
- Nút loa phát hoặc tạm dừng bản âm thanh nền từ file mẫu. Âm thanh phát lặp sau khi bạn bật.
- Ảnh nền và font được lưu trong repo. Không phụ thuộc CDN khi chạy.

Thông tin tạo ảnh và giấy phép font: [assets/README.md](../assets/README.md).

Phần điều khiển cảnh nằm trong `garden.js`. Bộ dựng và tài nguyên từ file mẫu nằm trong `assets/valley/`.

Các URL mạng xã hội nằm trong `script.js`; khi sửa URL, cập nhật cả `href` tương ứng trong `index.html` để liên kết vẫn hoạt động khi JavaScript bị tắt.
