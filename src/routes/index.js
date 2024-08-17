const { PaymentController } = require('../controller/data.controller');
const express = require('express');

const router = express.Router();
const paymentController = new PaymentController();

router.get('/', (_req, res) =>
  paymentController.getAllPaymentDetailsByProperty(_req, res),
);

module.exports = router;
