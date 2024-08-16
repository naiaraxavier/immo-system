const { getPaymentDetailsByProperty } = require('../model/data.model');

const getAllPaymentDetailsByProperty = async (_req, res) => {
  try {
    const result = await getPaymentDetailsByProperty();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
};

module.exports = {
  getAllPaymentDetailsByProperty,
};
