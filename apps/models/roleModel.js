const db = require('../config/dbManager');

class RoleModel {
    constructor(data = {}) {
        this.tableName = 'role';

        this.columns = {
            idRole: 'idRole',
            roleName: 'roleName',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.idRole = data.idRole || null;
        this.roleName = data.roleName || null;
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

module.exports = RoleModel;