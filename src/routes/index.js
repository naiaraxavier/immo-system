const express = require('express');
const { PaymentController } = require('../controller/data.controller');

const router = express.Router();
const paymentController = new PaymentController();

router.get('/', (_req, res) => paymentController.getAllPaymentDetailsByProperty(_req, res));
router.get('/api/payments-summary', (req, res) => paymentController.getSumsPaymentsByProperty(req, res));

module.exports = router;
