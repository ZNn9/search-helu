var db = require('../config/dbManager');
class IndustryTypeModel {
    constructor(data = {}) {
        this.tableName = 'industrytype';

        this.columns = {
            id: 'idIndustryType',
            name: 'nameIndustryType',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.id = data.idIndustryType || null;
        this.name = data.nameIndustryType || null;
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

module.exports = IndustryTypeModel;