
export const verifyToken = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({ message: "Unauthenticated" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}