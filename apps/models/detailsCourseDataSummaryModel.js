const db = require('../config/dbManager');

class DetailsCourseDataSummaryModel {
    constructor(data = {}) {
        this.tableName = 'detailscoursedatasummary';

        this.columns = {
            idCourse: 'idCourse',
            idCourseDataSummary: 'idCourseDataSummary',
            quantityFollow: 'quantityFollow',
            quantityView: 'quantityView',
            quantityComment: 'quantityComment',
            quantityFavorite: 'quantityFavorite',
            quantityShared: 'quantityShared',
            quantitySaved: 'quantitySaved',
            timeCreated: 'timeCreated'
        };

        this.idCourse = data.idCourse || null;
        this.idCourseDataSummary = data.idCourseDataSummary || null;
        this.quantityFollow = data.quantityFollow || 0;
        this.quantityView = data.quantityView || 0;
        this.quantityComment = data.quantityComment || 0;
        this.quantityFavorite = data.quantityFavorite || 0;
        this.quantityShared = data.quantityShared || 0;
        this.quantitySaved = data.quantitySaved || 0;
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

module.exports = DetailsCourseDataSummaryModel;