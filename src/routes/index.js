const express = require('express');
const {
  getAllPaymentDetailsByProperty,
} = require('../controller/data.controller');

const router = express.Router();

router.get('/all-data', getAllPaymentDetailsByProperty);

module.exports = router;
