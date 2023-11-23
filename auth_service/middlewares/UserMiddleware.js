const { verifyJwt } = require("../utils/VerifyJwt");


const authMiddleware = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const tokenParts = token.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const tokenValue = tokenParts[1];

    try {
        const verifyToken = verifyJwt(tokenValue);
        const isValidToken = verifyToken.valid;

        if (!isValidToken) {
            return res.status(401).json({ success: false, message: "You are unauthorized" });
        }
        req.jwt = verifyToken.verification;
        next(); // Llamar a next si el token es válido
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { authMiddleware };
