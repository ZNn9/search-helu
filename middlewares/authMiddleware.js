const jwt = require('jsonwebtoken');

class AuthMiddleware {
    constructor() {
        this.authMiddleware = this.authMiddleware.bind(this);
    }

    authMiddleware = (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
        }

        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            req.user = decoded; // Lưu user vào request để sử dụng tiếp
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }
    };

    adminMiddleware = (req, res, next) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }
        next();
    };
    
}
module.exports = AuthMiddleware;
