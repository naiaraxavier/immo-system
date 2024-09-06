const { PaymentRepository } = require('../model/data.model');
/* eslint-disable camelcase */

class PaymentController {
  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  // Método auxiliar para lidar com erros
  static _handleError(res, err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }

  // Método auxiliar para obter detalhes dos pagamentos do banco
  async _getPaymentDetails() {
    try {
      return await this.paymentRepository.getPaymentDetailsByProperty();
    } catch (err) {
      throw new Error({ message: err.sqlMessage });
    }
  }

  // Obtém todos os detalhes dos pagamentos
  async getAllPaymentDetailsByProperty(_req, res) {
    try {
      const result = await this._getPaymentDetails();
      res.status(200).json(result);
    } catch (err) {
      this._handleError(res, err);
    }
  }

  // Obtém a soma dos pagamentos agrupados por propriedade
  async getSumsPaymentsByProperty(_req, res) {
    try {
      const payments = await this._getPaymentDetails();
      const propertySums = PaymentController._calculatePropertySums(payments);
      const result = Object.entries(propertySums).map(([code_property, { property_description, total_payment }]) => ({
        code_property,
        property_description,
        total_payment: total_payment.toFixed(2),
      }));
      res.status(200).json(result);
    } catch (err) {
      this._handleError(res, err);
    }
  }

  // Calcula a soma dos pagamentos por propriedade
  static _calculatePropertySums(payments) {
    return payments.reduce((acc, { code_property, payment_amount, property_description }) => {
      if (!acc[code_property]) {
        acc[code_property] = { property_description, total_payment: 0 };
      }
      acc[code_property].total_payment += parseFloat(payment_amount);

      return acc;
    }, {});
  }

  // Obtém o total de vendas por mês/ano
  async getMonthlyTotals(_req, res) {
    try {
      const payments = await this._getPaymentDetails();
      const monthlyTotals = PaymentController._calculateMonthlyTotals(payments);
      const result = Object.entries(monthlyTotals).map(([monthYear, total_payment]) => ({
        month_year: monthYear,
        total_payment: total_payment.toFixed(2),
      }));
      res.status(200).json(result);
    } catch (err) {
      this._handleError(res, err);
    }
  }

  // Calcula os totais mensais de pagamentos
  static _calculateMonthlyTotals(payments) {
    return payments.reduce((acc, { payment_date_rental, payment_amount }) => {
      const date = new Date(payment_date_rental);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + parseFloat(payment_amount);
      return acc;
    }, {});
  }

  // Obtém a porcentagem de vendas por tipo de imóvel
  async getPropertyTypePercentages(_req, res) {
    try {
      const payments = await this._getPaymentDetails();
      const propertyTypeSums = PaymentController._calculatePropertyTypeSums(payments);
      const totalSales = Object.values(propertyTypeSums).reduce((sum, { total_payment }) => sum + total_payment, 0);

      const percentages =
        totalSales > 0
          ? Object.entries(propertyTypeSums).map(([property_type_name, { total_payment }]) => ({
              property_type_name,
              percentage: `${((total_payment / totalSales) * 100).toFixed(2)}%`,
            }))
          : [];

      res.status(200).json(percentages);
    } catch (err) {
      this._handleError(res, err);
    }
  }

  // Calcula a soma dos pagamentos por tipo de imóvel
  static _calculatePropertyTypeSums(payments) {
    return payments.reduce((acc, { property_type_name, payment_amount }) => {
      if (!property_type_name) {
        console.warn('Warning: Missing property_type_name in payment data:', { property_type_name, payment_amount });
        return acc;
      }
      if (!acc[property_type_name]) {
        acc[property_type_name] = { total_payment: 0 };
      }
      acc[property_type_name].total_payment += parseFloat(payment_amount);
      return acc;
    }, {});
  }
}

module.exports = { PaymentController };
