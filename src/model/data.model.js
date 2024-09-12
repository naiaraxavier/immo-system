const dbConnection = require('./connection-db');
const QUERY = require('./query');

class PaymentRepository {
  constructor() {
    this.query = QUERY;
  }

  async getPaymentDetailsByProperty() {
    const conn = await dbConnection.getConnection();
    try {
      const [result] = await conn.execute(this.query);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}

module.exports = { PaymentRepository };
