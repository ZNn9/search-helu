const db = require('../config/dbManager');

class TagModel {
    constructor(data = {}) {
        this.tableName = 'tag';

        this.columns = {
            idTag: 'idTag',
            nameTag: 'nameTag',
            numberUses: 'numberUses',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.idTag = data.idTag || null;
        this.nameTag = data.nameTag || null;
        this.numberUses = data.numberUses || 0;
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

module.exports = TagModel;