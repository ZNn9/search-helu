const mysql = require('mysql2/promise');
const dotenv = require('dotenv');


dotenv.config();
class DatabaseConnection {
    constructor() {
        // Tạo một pool kết nối nhưng không kết nối ngay
        this.pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
            
        });

        this.initializeConnection();
    }

    async initializeConnection() {
        try {
            const connection = await this.pool.getConnection();
            console.log('🟢 Kết nối database thành công!');
            connection.release();
        } catch (err) {
            console.error('🔴 Lỗi kết nối database:', err);
            console.error('👉 Kiểm tra lại thông tin kết nối trong .env');
        }
    }

    mysqlToNodeJsTypeMap = {
        'int': 'number',
        'tinyint': 'number',
        'smallint': 'number',
        'mediumint': 'number',
        'bigint': 'number',
        'float': 'number',
        'double': 'number',
        'decimal': 'number',
        'varchar': 'string',
        'char': 'string',
        'text': 'string',
        'mediumtext': 'string',
        'longtext': 'string',
        'date': 'Date',
        'datetime': 'Date',
        'timestamp': 'Date',
        'time': 'string',
        'year': 'number',
        'json': 'object',
        'enum': 'string',
        'set': 'array'
    };

    /**
     * @param {string} sql 
     * @param {Array} params
     * @returns {Promise<Object>}
     */
    async query(sql, params = []) {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute(sql, params);
            return { rows };
        } catch (error) {
            throw new Error(`Lỗi truy vấn: ${error.message}`);
        } finally {
            connection.release();
        }
    }


}

module.exports = new DatabaseConnection();
