const conn = require('./connection-db');

const getPaymentDetailsByProperty = async () => {
  const [result] = await conn.execute(
    `SELECT 
      p.id_payment AS id_payment_rental,
      p.payment_date AS payment_date_rental,
      p.payment_amount,
      pr.cod_property AS code_property,
      pr.property_description,
      pt.property_type_name
    FROM 
      payments p
    JOIN 
      rentals r ON p.rental_id = r.id_rental
    JOIN 
      properties pr ON r.property_cod = pr.cod_property
    JOIN 
      property_types pt ON pr.property_type_id = pt.id_property_type`,
  );
  return result;
};

module.exports = { getPaymentDetailsByProperty };
