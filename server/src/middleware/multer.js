const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Cấu hình multer để lưu ảnh vào thư mục tạm
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../../client/public/assets/img/avatars');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Đường dẫn đến thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Đặt tên file duy nhất
    }
});

const upload = multer({ storage: storage });

module.exports = upload;