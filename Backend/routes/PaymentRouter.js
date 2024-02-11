const express = require('express');
const router = express.Router();
const PaymentMethod = require('../models/PaymentModel');
const authMiddleware = require('./middleware/auth');

// POST endpoint to add a new payment method
router.post('/payment', authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const {
      cardNumber,
      cardHolderName,
      expirationDate,
      cvv,
      // Add other payment method details as needed
    } = req.body;

    const paymentMethod = new PaymentMethod({
      user: user._id,
      cardNumber,
      cardHolderName,
      expirationDate,
      cvv,
      // Include other payment method details from the request body
    });

    await paymentMethod.save();

    res.status(201).json({ message: 'Payment method added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint to retrieve payment methods for a user
router.get('/payment-methods', authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const paymentMethods = await PaymentMethod.find({ user: user._id });

    res.status(200).json(paymentMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
