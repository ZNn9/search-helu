const db = require('../config/dbManager');


class DatabaseModel {
    constructor() {
        this.tableName = null;
    }
    
    /**
     * @param {string} tableName 
     * @param {string[]} columns 
     * @param {Object} filters
     * @returns {Promise<Array>}
     */
    async searchInDB(tableName, columns = ['*'], filters = {}) {
        try {
            if (!tableName) throw new Error("Tên bảng không hợp lệ!");
    
            const selectedColumns = columns.length > 0 ? columns.join(', ') : '*';
    
            let sql = `SELECT ${selectedColumns} FROM \`${tableName}\``;
            const conditions = [];
            const values = [];
    
            for (let key in filters) {
                if (filters.hasOwnProperty(key) && filters[key] !== undefined && filters[key] !== null) {
                    if (typeof filters[key] === 'object' && filters[key].min !== undefined && filters[key].max !== undefined) {
                        conditions.push(`\`${key}\` BETWEEN ? AND ?`);
                        values.push(filters[key].min, filters[key].max);
                    } else if (key === 'start_date' || key === 'end_date') {
                        if (key === 'start_date') {
                            conditions.push(`timeCreated >= ?`);
                            values.push(`${filters.start_date} 00:00:00`);
                        } else {
                            conditions.push(`timeCreated <= ?`);
                            values.push(`${filters.end_date} 23:59:59`);
                        }
                    } else if (typeof filters[key] === 'string') {
                        conditions.push(`\`${key}\` LIKE ?`);
                        values.push(`%${filters[key]}%`);
                    } else {
                        conditions.push(`\`${key}\` = ?`);
                        values.push(filters[key]);
                    }
                }
            }
    
            if (conditions.length > 0) {
                sql += ' WHERE ' + conditions.join(' AND ');
            }
    
            console.log("SQL Query:", sql, values); // Debug
    
            const results = await db.query(sql, values);
            return results;
    
        } catch (error) {
            throw new Error(`Lỗi truy vấn dữ liệu: ${error.message}`);
        }
    }
    

    /**
     * @param {string} tableName
     * @returns {Promise<Object>}
     */
    async getTableInfo(tableName) {
        try {
            if (!tableName) throw new Error("Tên bảng không hợp lệ!");

            const sql = `
                SELECT COLUMN_NAME
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
            `;
            const result = await db.query(sql, [tableName.toLowerCase()]);
            return {
                tableName: tableName,
                columns: result.rows.map(row => ({
                    name: row.COLUMN_NAME
                }))
            };
        } catch (error) {
            throw new Error(`Lỗi khi lấy thông tin bảng: ${error.message}`);
        }
    }

    /**
     * @param {string} tableName
     * @returns {Promise<Object>}
     */
    async getTableInfoDataType(tableName) {
        try {
            if (!tableName) throw new Error("Tên bảng không hợp lệ!");

            const sql = `
                SELECT COLUMN_NAME, DATA_TYPE
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
            `;
            const result = await db.query(sql, [tableName.toLowerCase()]);
            return {
                tableName: tableName,
                columns: result.rows.map(row => ({
                    name: row.COLUMN_NAME,
                    mysqlType: row.DATA_TYPE,
                    nodeJsType: db.mysqlToNodeJsTypeMap[row.DATA_TYPE] || 'string'
                }))
            };
        } catch (error) {
            throw new Error(`Lỗi khi lấy thông tin bảng: ${error.message}`);
        }
    }

    /**
     * @returns {Promise<Array>}
     */
    async getAllTables() {
        try {
            const sql = `SHOW TABLES`;
            const result = await db.query(sql);
            const tables = result.rows.map(row => Object.values(row)[0]);
            return tables;
        } catch (error) {
            throw new Error(`Lỗi khi lấy danh sách bảng: ${error.message}`);
        }
    }
}

module.exports = DatabaseModel;
