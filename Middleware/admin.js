const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_ADMIN_PASS = process.env.JWT_ADMIN_PASS;

function adminMiddleWare(req, res, next) {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader; // Split to get token after 'Bearer'

    if (!token) {
        return res.status(401).json({
            message: "JWT must be provided"
        });
    }

    try {
        const decode = jwt.verify(token, JWT_ADMIN_PASS);
        req.adminId = decode.id; // Save admin ID to request for later use
        next(); // Proceed to the next middleware/route handler
    } catch (e) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    adminMiddleWare: adminMiddleWare
};
