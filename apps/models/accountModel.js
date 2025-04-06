const db = require('../config/dbManager');

class AccountModel {
    constructor(data = {}) {
        this.tableName = 'account';

        this.columns = {
            idAccount: 'idAccount',
            accountName: 'accountName',
            password: 'password',
            name: 'name',
            email: 'email',
            birthday: 'birthday',
            description: 'description',
            timeCreated: 'timeCreated'
        };

        this.idAccount = data.idAccount || null;
        this.accountName = data.accountName || null;
        this.password = data.password || null;
        this.name = data.name || null;
        this.email = data.email || null;
        this.birthday = data.birthday || null;
        this.description = data.description || null;
        this.timeCreated = data.timeCreated || null;
    }

    async getAll() {
        try {
            const sql = `SELECT * FROM ${this.tableName}`;
            const result = await db.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Lỗi khi lấy danh sách tài khoản: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
            const result = await db.query(sql, [id]); 
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw new Error(`Lỗi khi lấy tài khoản có ID ${id}: ${error.message}`)
        }
    }

    async getRolesByUserId(userId) {
        try {
            const sql = `
                SELECT r.roleName
                FROM roledetails rd
                JOIN role r ON rd.idRole = r.idRole
                WHERE rd.idAccount = ?
            `;
            const result = await db.query(sql, [userId]);
            return result.rows.map(row => row.roleName);
        } catch (error) {
            throw new Error(`Lỗi khi lấy vai trò của người dùng: ${error.message}`);
        }
    }
}

module.exports = AccountModel;