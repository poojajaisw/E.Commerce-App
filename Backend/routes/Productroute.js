const express = require('express');
const router = express.Router();
const { Product, Review } = require('../models/Product_model'); // Import the Product and Review models
const authMiddleware = require('./middleware/auth');
 

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const { customId, name, price, category, description, image } = req.body;

    const newProduct = new Product({
      customId,
      name,
      price,
      category,
      description,
      image,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create a product' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
});

// Get a specific product by customId
router.get('/products/:customId', async (req, res) => {
  try {
    const customId = req.params.customId;

    const product = await Product.findOne({ customId });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error finding product:', error);
    res.status(500).json({ error: 'Error finding product' });
  }
});

// Submit a new review for a product

router.post('/products/:customId/reviews', authMiddleware, async (req, res) => {
  try {
    const { rating, content } = req.body;

    // Validate rating
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    const { customId } = req.params;
    const userId = req.user._id;

    const newReview = new Review({
      user: userId,
      rating,
      content,
    });

    const product = await Product.findOne({ customId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.reviews.push(newReview);
    await product.save();

    res.status(200).json({ message: 'Review submitted successfully!', review: newReview });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Error submitting review', details: error.message });
  }
});

router.get('/products/:customId/reviews', async (req, res) => {
  try {
    const { customId } = req.params;

    const product = await Product.findOne({ customId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const reviews = product.reviews;

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews', details: error.message });
  }
});




// Update a review by ID
router.put('/products/:customId', authMiddleware, async (req, res) => {
  try {
    const { customId } = req.params;
    const { name, description, price } = req.body;

    // Validate input fields as needed

    const product = await Product.findOne({ customId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product', details: error.message });
  }
});


router.delete('/reviews/:customId', authMiddleware, async (req, res) => {
  try {
    const { customId } = req.params;

    const review = await Product.findOneAndDelete({ customId });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully', review });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Error deleting review', details: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const results = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }, 
        { productId: { $regex: searchTerm, $options: 'i' } }// Case-insensitive regex match
        // Add other fields you want to search here
      ],
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
});



module.exports = router;