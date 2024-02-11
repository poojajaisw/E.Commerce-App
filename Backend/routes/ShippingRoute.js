const express = require('express');
const router = express.Router();
const { Shipping } = require('../models/Shipping'); // Import the Product and Review models
const authMiddleware = require('./middleware/auth');
 


router.post('/shipping/:customId', authMiddleware, async (req, res) => {
    try {
      const { customId } = req.params;
      const userId = req.user._id;
  
      // Create a new shipping record associated with the user and customId
      const shipping = new Shipping({
        user: userId,
        recipientName: req.body.recipientName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        // Include other shipping details from the request body
      });
  
      await shipping.save();
  
      res.status(201).json({ message: 'Shipping information saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;






