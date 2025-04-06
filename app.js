const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/apis');

dotenv.config();

const app = express();

// Cấu hình CORS
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || 'http://localhost:3000' || 'http://localhost:80',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging (chỉ trong development)
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Gắn routes
app.use('/api', routes);

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Lỗi server nội bộ' });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Xuất app để có thể dùng trong test nếu cần