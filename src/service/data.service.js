const { PaymentRepository } = require('../model/data.model');

class PaymentService {
  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  // Método que busca dados do banco de dados
  async getPaymentDetails() {
    try {
      return await this.paymentRepository.getPaymentDetailsByProperty();
    } catch (err) {
      throw new Error({ message: err.sqlMessage });
    }
  }

  // Calcula a soma dos pagamentos dos imóveis por código/id
  calculatePropertySums(payments) {
    return payments.reduce((acc, { code_property, payment_amount, property_description }) => {
      if (!acc[code_property]) {
        acc[code_property] = { property_description, total_payment: 0 };
      }
      acc[code_property].total_payment += parseFloat(payment_amount);
      return acc;
    }, {});
  }

  // Calcula os totais mensais de pagamentos
  calculateMonthlyTotals(payments) {
    return payments.reduce((acc, { payment_date_rental, payment_amount }) => {
      const date = new Date(payment_date_rental);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + parseFloat(payment_amount);
      return acc;
    }, {});
  }

  // Calcula a soma dos pagamentos por tipo de imóvel
  calculatePropertyTypeSums(payments) {
    return payments.reduce((acc, { property_type_name, payment_amount }) => {
      if (!acc[property_type_name]) {
        acc[property_type_name] = { total_payment: 0 };
      }
      acc[property_type_name].total_payment += parseFloat(payment_amount);
      return acc;
    }, {});
  }

  // Calcula o total de todas as vendas
  calculateTotalSales(propertyTypeSums) {
    return Object.values(propertyTypeSums).reduce((sum, { total_payment }) => sum + total_payment, 0);
  }

  // Calcula a porcentagem de vendas por tipo de imóvel
  calculatePercentagesByType(total_payment, totalSales) {
    return `${((total_payment / totalSales) * 100).toFixed(2)}%`;
  }
}

module.exports = { PaymentService };
