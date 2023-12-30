var jwt = require('jsonwebtoken');
const configs = require('../helper/config.js')

function verifyToken(token) {
    try {
        return jwt.verify(token, configs.SECRET_KEY);
    } catch (error) {
        throw new Error('Authentication failed');
    }
}

module.exports = {
    checkLogin: async function (req) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Please log in");
        }
        const decodedToken = verifyToken(token);
        return decodedToken.id;
    },

    checkRole: function (requiredRole) {
        return function (req, res, next) {
            const userRole = req.user.role; // Assuming user role is set in req.user
            if (userRole !== requiredRole) {
                throw new Error("Access denied");
            }
            next();
        };
    },

    // Common error handling middleware
    errorHandler: function (err, req, res, next) {
        res.status(500).send({ error: err.message });
    }
};