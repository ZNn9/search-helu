const db = require('../config/dbManager');

class StatusTypeModel {
    constructor(data = {}) {
        this.tableName = 'statustype';

        this.columns = {
            idStatusType: 'idStatusType',
            nameStatusType: 'nameStatusType',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.idStatusType = data.idStatusType || null;
        this.nameStatusType = data.nameStatusType || null;
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

module.exports = StatusTypeModel;