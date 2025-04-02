const db = require('../config/dbManager');

class HistoryActionLessonModel {
    constructor(data = {}) {
        this.tableName = 'historyactionlesson';

        this.columns = {
            idAccount: 'idAccount',
            idLesson: 'idLesson',
            idActionType: 'idActionType',
            timeCreated: 'timeCreated'
        };

        this.idAccount = data.idAccount || null;
        this.idLesson = data.idLesson || null;
        this.idActionType = data.idActionType || null;
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

module.exports = HistoryActionLessonModel;