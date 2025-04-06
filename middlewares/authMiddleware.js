const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const account = require('../apps/models/accountModel');
const dbAccount = new account(); // Khởi tạo model tài khoản
// Tải biến môi trường từ file .env
dotenv.config();

class AuthMiddleware {
    constructor() {
        this.requireToken = this.requireToken.bind(this);
        this.optionalToken = this.optionalToken.bind(this);
    }
    /**
     * Middleware bắt buộc token
     */
    async requireToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header Authorization

        if (!token) {
            console.log('No token provided'); // Log khi không có token
            return res.status(401).json({ message: 'Token is required!' });
        }

        try {
            // Xác thực và giải mã token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.sub; // Lấy ID người dùng từ token
            console.log('User ID:', userId);

            // Truy vấn bảng roledetails để lấy vai trò của người dùng
            const roles = await dbAccount.getRolesByUserId(userId);
            req.user = { id: userId, roles }; // Gắn ID và vai trò vào req.user
            console.log('User roles:', roles);

            next();
        } catch (err) {
            console.warn('Invalid or expired token:', err.message);
            return res.status(401).json({ message: 'Invalid or expired token!' });
        }
    }

    /**
     * Middleware không bắt buộc token
     */
    async optionalToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header Authorization

        if (token) {
            try {
                // Xác thực và giải mã token
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                const userId = decoded.sub; // Lấy ID người dùng từ token
                console.log('User ID:', userId);

                // Truy vấn bảng roledetails để lấy vai trò của người dùng
                const roles = await dbAccount.getRolesByUserId(userId);
                req.user = { id: userId, roles }; // Gắn ID và vai trò vào req.user
                console.log('User roles:', roles);
            } catch (err) {
                console.warn('Invalid or expired token:', err.message);
                // Không trả về lỗi, tiếp tục xử lý với req.user là undefined
            }
        } else {
            console.log('No token provided'); // Log khi không có token
        }

        // Nếu không có token, tiếp tục xử lý với req.user là undefined
        next();
    }
}

module.exports = AuthMiddleware;
