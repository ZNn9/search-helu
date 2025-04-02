const db = require('../config/dbManager');

class DetailsLessonTagModel {
    constructor(data = {}) {
        this.tableName = 'detailsLessontag';

        this.columns = {
            idCourse: 'idCourse',
            idTag: 'idTag',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.idCourse = data.idCourse || null;
        this.idTag = data.idTag || null;
        this.description = data.description || null;
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

module.exports = DetailsLessonTagModel;