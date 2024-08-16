const conn = require('./connection-db');
const QUERY = require('./query');

const getPaymentDetailsByProperty = async () => {
  try {
    const [result] = await conn.execute(QUERY);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

module.exports = { getPaymentDetailsByProperty };
