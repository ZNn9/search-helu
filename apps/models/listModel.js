var db = require('../config/dbManager');

class ListModel {
    constructor(data = {}) {
        this.tableName = 'list';

        this.columns = {
            id: 'idList',
            idAccount: 'idAccount',
            name: 'nameList',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.id = data.idList || null;
        this.idAccount = data.idAccount || null;
        this.name = data.nameList || null;
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

module.exports = ListModel;