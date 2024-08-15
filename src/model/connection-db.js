const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 33060,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.DB_NAME || 'real_estate_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

const setCharset = async () => {
  const conn = await connection.getConnection();
  await conn.query('SET NAMES utf8mb4');
  conn.release();
};

setCharset().catch(console.error);

module.exports = connection;
