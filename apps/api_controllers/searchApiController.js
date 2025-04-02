const databaseModel = require('../models/DatabaseModel');
const dbModel = new databaseModel();

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
            if (!tableName) return res.status(400).json({ message: 'Thiếu tên bảng cần truy vấn' });

            const normalizedTable = tableName.toLowerCase();
            const columnList = columns ? columns.split(',') : ['*'];
            const results = await dbModel.searchInDB(normalizedTable, columnList, filters);
            
            res.json(results);
        } catch (error) {
            console.error('Lỗi khi tìm kiếm:', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}

module.exports = SearchApiController;
