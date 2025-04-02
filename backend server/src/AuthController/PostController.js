const Post = require('../AuthModel/PostModel');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.uploadFiles = upload.fields([
  { name: 'companyProfile', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

exports.createPost = async (req, res) => {
  try {
    const { companyName, title, description } = req.body;

    if (!companyName || !title || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const post = new Post({
      companyName,
      companyProfile: req.files?.['companyProfile'] ? `/uploads/${req.files['companyProfile'][0].filename}` : null,
      title,
      description,
      image: req.files?.['image'] ? `/uploads/${req.files['image'][0].filename}` : null,
      createdAt: Date.now(),
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', data: post });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    console.log('Handling GET request for /api/posts');
    const posts = await Post.find();
    console.log('Fetched posts:', posts);
    res.status(200).json({ data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};