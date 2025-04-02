const db = require('../config/dbManager');

class CourseModel {
    constructor(data = {}) {
        this.tableName = 'course';

        this.columns = {
            idCourse: 'idCourse',
            idAccount: 'idAccount',
            idIndustryType: 'idIndustryType',
            idPriorityType: 'idPriorityType',
            idCopyrightType: 'idCopyrightType',
            idStatusType: 'idStatusType',
            courseName: 'courseName',
            description: 'description',
            quantityFollow: 'quantityFollow',
            quantityView: 'quantityView',
            quantityComment: 'quantityComment',
            quantityFavorite: 'quantityFavorite',
            quantityShared: 'quantityShared',
            quantitySaved: 'quantitySaved',
            timeCreated: 'timeCreated'
        };

        this.idCourse = data.idCourse || null;
        this.idAccount = data.idAccount || null;
        this.idIndustryType = data.idIndustryType || null;
        this.idPriorityType = data.idPriorityType || null;
        this.idCopyrightType = data.idCopyrightType || null;
        this.idStatusType = data.idStatusType || null;
        this.courseName = data.courseName || null;
        this.description = data.description || null;
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
            throw error;
        }
    }

    async getById(id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
            const result = await db.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CourseModel;