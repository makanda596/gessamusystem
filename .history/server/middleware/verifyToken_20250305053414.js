import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    jwt.verify(token, process.env.SECTRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
