var db = require('../config/dbManager');

class PriorityTypeModel {
    constructor(data = {}) {
        this.tableName = 'prioritytype';

        this.columns = {
            id: 'idPriorityType',
            name: 'namePriorityType',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.id = data.idPriorityType || null;
        this.name = data.namePriorityType || null;
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

module.exports = PriorityTypeModel;