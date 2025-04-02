const db = require('../config/dbManager');

class LessonModel {
    constructor(data = {}) {
        this.tableName = 'lesson';

        this.columns = {
            idLesson: 'idLesson',
            idCourse: 'idCourse',
            idCopyrightType: 'idCopyrightType',
            idStatusType: 'idStatusType',
            lessonName: 'lessonName',
            videoAddress: 'videoAddress',
            description: 'description',
            quantityView: 'quantityView',
            quantityComment: 'quantityComment',
            quantityFavorite: 'quantityFavorite',
            quantityShared: 'quantityShared',
            quantitySaved: 'quantitySaved',
            timeCreated: 'timeCreated'
        };

        this.idLesson = data.idLesson || null;
        this.idCourse = data.idCourse || null;
        this.idCopyrightType = data.idCopyrightType || null;
        this.idStatusType = data.idStatusType || null;
        this.lessonName = data.lessonName || null;
        this.videoAddress = data.videoAddress || null;
        this.description = data.description || null;
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
            const sql = `SELECT * FROM ${this.tableName} WHERE idLesson = ?`;
            const result = await db.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = LessonModel;