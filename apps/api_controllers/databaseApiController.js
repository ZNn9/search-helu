const databaseModel = require('../models/DatabaseModel');
const dbModel = new databaseModel();

class DatabaseApiController {
    constructor() {
        this.findAllTableNameInDB = this.findAllTableNameInDB.bind(this);
        this.findAttributesInTable = this.findAttributesInTable.bind(this);  
        this.findAttributesInTableOnlyName = this.findAttributesInTableOnlyName.bind(this);  
    }

    /**
     * @param {Object} req - Request từ client
     * @param {Object} res - Response gửi về client
     * @returns {Promise<void>}
     */
    async findAllTableNameInDB(req, res) {
        try {
            const tables = await dbModel.getAllTables();
            return res.json({ tables });
        } catch (error) {
            console.error('Lỗi khi tìm kiếm table có trong database:', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    /**
     * @param {Object} req - Request từ client
     * @param {Object} res - Response gửi về client
     * @returns {Promise<void>}
     */
    async findAttributesInTable(req, res) {
        try {
            const { tableName } = req.params;
            const tableInfo = await dbModel.getTableInfoDataType(tableName);
            return res.json({ tableInfo });
        } catch (error) {
            console.error('Lỗi khi tìm kiếm thuộc tính trong bảng:', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    /**
     * @param {Object} req - Request từ client
     * @param {Object} res - Response gửi về client
     * @returns {Promise<void>}
     */
    async findAttributesInTableOnlyName(req, res) {
        try {
            const { tableName } = req.params;
            const tableInfo = await dbModel.getTableInfo(tableName);
            return res.json({ tableInfo });
        } catch (error) {
            console.error('Lỗi khi tìm kiếm thuộc tính trong bảng:', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}

module.exports = DatabaseApiController;