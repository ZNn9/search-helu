const DatabaseModel = require('../models/DatabaseModel'); // Import model cơ sở dữ liệu
const dbModel = new DatabaseModel(); // Khởi tạo instance của model

class SearchApiController {
    constructor() {
        this.searchInDB = this.searchInDB.bind(this);
    }

    /**
     * @param {Object} req - Request từ client
     * @param {Object} res - Response gửi về client
     * @returns {Promise<void>}
     */

    // GET /api/search/account/&columns=id,name,email&name=John
    async searchInDB(req, res) {
        try {
            const { tableName } = req.params;
            const { columns, ...filters } = req.query;

            if (!tableName) {
                return res.status(400).json({ message: 'Thiếu tên bảng cần truy vấn' });
            }

            const normalizedTable = tableName.toLowerCase();
            const userRoles = req.user?.roles || []; // Lấy roles từ req.user

            // Log dữ liệu từ req.user để kiểm tra
            console.log('req.user:', req.user);

            // Chuyển đổi roles từ token thành danh sách tên vai trò
            const roleNames = userRoles.map(role => role.toLowerCase());

            // Log danh sách vai trò
            console.log('Role names:', roleNames);

            // Xác định vai trò cao nhất
            const highestRole = roleNames.includes('admin')
                ? 'admin'
                : roleNames.includes('user')
                ? 'user'
                : 'guest';

            console.log('Highest role:', highestRole);

            // Nếu là Admin, bỏ qua kiểm tra quyền
            if (highestRole === 'admin') {
                const columnList = columns ? columns.split(',') : ['*'];
                const results = await dbModel.searchInDB(normalizedTable, columnList, filters);
                return res.json(results);
            }

            // Lấy quyền theo vai trò
            const tablePermissions = {
                user: {
                    allowedTables: ['course', 'lesson', 'account'],
                    allowedColumns: {
                        account: ['idAccount', 'name', 'email'],
                        course: null,
                        lesson: null,
                    },
                },
                guest: {
                    allowedTables: ['course', 'lesson', 'account'],
                    allowedColumns: {
                        account: ['idAccount', 'name', 'email'],
                        course: null,
                        lesson: null,
                    },
                },
            };

            const permissions = tablePermissions[highestRole];

            // Kiểm tra quyền truy cập bảng
            if (!permissions.allowedTables.includes(normalizedTable)) {
                return res.status(403).json({ message: 'Access denied! You do not have permission to access this table.' });
            }

            // Kiểm tra quyền truy cập cột
            const columnList = columns ? columns.split(',') : ['*'];
            if (permissions.allowedColumns && permissions.allowedColumns[normalizedTable] !== null) {
                const allowedColumns = permissions.allowedColumns[normalizedTable];
                const invalidColumns = columnList.filter(col => !allowedColumns.includes(col));
                if (invalidColumns.length > 0) {
                    return res.status(403).json({
                        message: 'Access denied! You do not have permission to access these columns.',
                        invalidColumns,
                    });
                }
            }

            // Truy vấn cơ sở dữ liệu
            const results = await dbModel.searchInDB(normalizedTable, columnList, filters);
            return res.json(results);
        } catch (error) {
            console.error('Lỗi khi tìm kiếm:', error);
            return res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}

module.exports = SearchApiController;
