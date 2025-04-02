const db = require('../config/dbManager');

class HistoryModel {
    constructor(data = {}) {
        this.tableName = 'history';

        this.columns = {
            idAccount: 'idAccount',
            idLesson: 'idLesson',
            timeCreated: 'timeCreated'
        };

        this.idAccount = data.idAccount || null;
        this.idLesson = data.idLesson || null;
        this.timeCreated = data.timeCreated || null;
    }

    async getAll() {
        try {
            const sql = `SELECT * FROM ${this.tableName}`;
            const result = await db.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Lỗi khi lấy danh sách tài khoản: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
            const result = await db.query(sql, [id]); 
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw new Error(`Lỗi khi lấy tài khoản có ID ${id}: ${error.message}`)
        }
    }
}

module.exports = HistoryModel;