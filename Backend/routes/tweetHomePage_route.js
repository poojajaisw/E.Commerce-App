const express = require('express');
const multer = require('multer');
const router = express.Router();
const authMiddleware = require('./middleware/auth'); 
const TweetPost = require('../models/tweetHomePage'); 

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/tweets', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ error: 'Tweet content is required' });
    }

    const tweet = new TweetPost({
      content,
      tweetBy: {
        userId,
        username: req.user.userName,
      },
      image: req.file ? req.file.buffer.toString('base64') : null,
    });

    const savedTweet = await tweet.save();
    res.status(201).json(savedTweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all tweets
router.get('/tweets', async (req, res) => {
  try {
    const tweets = await TweetPost.find().sort({ createdAt: -1 });
    res.json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific tweet by ID
router.get('/tweets/:tweetId', async (req, res) => {
  try {
    const tweet = await TweetPost.findById(req.params.tweetId);
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    res.json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a tweet by ID
router.put('/tweets/:tweetId', authMiddleware, async (req, res) => {
  try {
    const { content, image } = req.body;
    const userId = req.user._id;

    const tweet = await TweetPost.findById(req.params.tweetId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    if (tweet.tweetBy.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    tweet.content = content;
    tweet.image = image;
    tweet.updatedAt = new Date();

    const updatedTweet = await tweet.save();
    res.json(updatedTweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a tweet by ID
router.delete('/tweets/:tweetId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const tweet = await TweetPost.findById(req.params.tweetId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    if (tweet.tweetBy.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await tweet.remove();
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/tweets/:tweetId/like', authMiddleware, async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const userId = req.user._id;

    const tweet = await TweetPost.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    // Check if the user has already liked the tweet
    if (tweet.likes.some(like => like.userId.toString() === userId.toString())) {
      return res.status(400).json({ error: 'Tweet already liked by the user' });
    }

    // Adding the user to the likes array
    tweet.likes.push({ userId, username: req.user.userName });
    await tweet.save();

    res.json({ message: 'Tweet liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reply to a tweet
router.post('/tweets/:tweetId/reply', authMiddleware, async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const userId = req.user._id;
    const { content } = req.body;

    const tweet = await TweetPost.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    // Add the reply to the replies array
    tweet.replies.push({
      userId,
      username: req.user.userName,
      content,
    });

    await tweet.save();

    res.json({ message: 'Reply added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

