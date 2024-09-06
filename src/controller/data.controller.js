/* eslint-disable camelcase */
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

  // Soma dos pagamentos por propriedades
  async getSumsPaymentsByProperty(_req, res) {
    try {
      // Obtém os detalhes dos pagamentos
      const payments = await this.paymentRepository.getPaymentDetailsByProperty();

      // Reduz os pagamentos para calcular as somas e obter as descrições das propriedades
      const propertySums = PaymentController.calculatePropertySums(payments);

      // Transforma o resultado em um array com o formato desejado
      const result = Object.entries(propertySums).map(([code_property, { property_description, total_payment }]) => ({
        code_property,
        property_description,
        total_payment: total_payment.toFixed(2),
      }));

      // Retorna o resultado como JSON
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Faz a soma dos pagamentos, agrupando pelo código da propriedade
  static calculatePropertySums(payments) {
    return payments.reduce((acc, { code_property, payment_amount, property_description }) => {
      if (!acc[code_property]) {
        acc[code_property] = { property_description, total_payment: 0 };
      }
      acc[code_property].total_payment += parseFloat(payment_amount);
      return acc;
    }, {});
  }

  static calculateMonthlyTotals(payments) {
    return payments.reduce((acc, payment) => {
      const date = new Date(payment.payment_date_rental);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + parseFloat(payment.payment_amount);
      return acc;
    }, {});
  }
}

module.exports = { PaymentController };
