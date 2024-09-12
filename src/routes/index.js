const express = require('express');
const { PaymentController } = require('../controller/data.controller');

const router = express.Router();
const paymentController = new PaymentController();

router.get('/', (_req, res) => paymentController.getAllPaymentDetailsByProperty(_req, res));
router.get('/api/payments-summary', (_req, res) => paymentController.getSumsPaymentsByProperty(_req, res));
router.get('/api/sales-by-month', (_req, res) => paymentController.getMonthlyTotals(_req, res));
router.get('/api/property-type-percentage', (_req, res) => paymentController.getPropertyTypePercentages(_req, res));

module.exports = router;
