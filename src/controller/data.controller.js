const { PaymentService } = require('../service/data.service');
/* eslint-disable camelcase */

class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }

  // Método auxiliar para lidar com erros
  handleError(res, err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }

  // Obtém todos os detalhes dos pagamentos
  async getAllPaymentDetailsByProperty(_req, res) {
    try {
      const result = await this.paymentService.getPaymentDetails();

      res.status(200).json(result);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  // Obtém a soma dos pagamentos agrupados por propriedade
  async getSumsPaymentsByProperty(_req, res) {
    try {
      const payments = await this.paymentService.getPaymentDetails();
      const propertySums = this.paymentService.calculatePropertySums(payments);

      const result = Object.entries(propertySums).map(([code_property, { property_description, total_payment }]) => ({
        code_property,
        property_description,
        total_payment: total_payment.toFixed(2),
      }));

      res.status(200).json(result);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  // Obtém o total de vendas por mês/ano
  async getMonthlyTotals(_req, res) {
    try {
      const payments = await this.paymentService.getPaymentDetails();
      const monthlyTotals = this.paymentService.calculateMonthlyTotals(payments);

      const result = Object.entries(monthlyTotals).map(([monthYear, total_payment]) => ({
        month_year: monthYear,
        total_payment: total_payment.toFixed(2),
      }));

      res.status(200).json(result);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  // Obtém a porcentagem de vendas por tipo de imóvel
  async getPropertyTypePercentages(_req, res) {
    try {
      const payments = await this.paymentService.getPaymentDetails();

      // Calcula a soma dos pagamentos por tipo de imóvel
      const propertyTypeSums = this.paymentService.calculatePropertyTypeSums(payments);

      // Calcula o total de vendas
      const totalSales = this.paymentService.calculateTotalSales(propertyTypeSums);

      const result =
        totalSales > 0
          ? Object.entries(propertyTypeSums).map(([property_type_name, { total_payment }]) => ({
              property_type_name,
              percentage: this.paymentService.calculatePercentagesByType(total_payment, totalSales),
            }))
          : [];

      res.status(200).json(result);
    } catch (err) {
      this.handleError(res, err);
    }
  }
}

module.exports = { PaymentController };
