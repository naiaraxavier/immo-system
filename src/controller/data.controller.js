const { PaymentRepository } = require('../model/data.model');

class PaymentController {
  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  async getAllPaymentDetailsByProperty(_req, res) {
    try {
      const result = await this.paymentRepository.getPaymentDetailsByProperty();
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.sqlMessage });
    }
  }
}

module.exports = { PaymentController };
