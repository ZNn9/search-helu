const db = require('../config/dbManager');

class CopyrightTypeModel {
    constructor(data = {}) {
        this.tableName = 'copyrighttype';

        this.columns = {
            idCopyrightType: 'idCopyrightType',
            nameCopyrightType: 'nameCopyrightType',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.idCopyrightType = data.idCopyrightType || null;
        this.nameCopyrightType = data.nameCopyrightType || null;
        this.description = data.description || null;
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

module.exports = CopyrightTypeModel;