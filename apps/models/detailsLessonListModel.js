const db = require('../config/dbManager');

class DetailsLessonListModel {
    constructor(data = {}) {
        this.tableName = 'detailsLessonlist';

        this.columns = {
            idList: 'idList',
            idLesson: 'idLesson',
            index: 'index',
            timeCreated: 'timeCreated'
        };

        this.idList = data.idList || null;
        this.idLesson = data.idLesson || null;
        this.index = data.index || 0;
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

module.exports = DetailsLessonListModel;