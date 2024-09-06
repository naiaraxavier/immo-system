const mysql = require('mysql2/promise');

class DatabaseConnection {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 33060,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.DB_NAME || 'real_estate_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async getConnection() {
    return this.pool;
  }
}

module.exports = new DatabaseConnection();
