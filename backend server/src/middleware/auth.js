// middleware/auth.js
const authMiddleware = (req, res, next) => {
    const userId = req.headers['user-id'] || req.body.userId;
    if (userId) {
        req.userId = userId; // Set userId if it exists
    }
    // Proceed to the application whether userId exists or not
    next();
};

module.exports = authMiddleware;

