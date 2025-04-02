const db = require('../config/dbManager');

class RoleDetailsModel {
    constructor(data = {}) {
        this.tableName = 'roledetails';

        this.columns = {
            idAccount: 'idAccount',
            idRole: 'idRole',
            timeCreated: 'timeCreated'
        };

        this.idAccount = data.idAccount || null;
        this.idRole = data.idRole || null;
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
            const sql = `SELECT * FROM ${this.tableName} WHERE idRole = ?`;
            const result = await db.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RoleDetailsModel;