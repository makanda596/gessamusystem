import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECTRET_KEY = process.env.SECTRET_KEY
export const AdminsetCookieGenerateToken = async (res, adminId) => {

    try {
        const token = jwt.sign({ adminId }, SECTRET_KEY, { expiresIn: "1m" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60 * 1000,
        })
        if (!token) {
            res.status(404).json({ message: "token not provided" })
            return 0;
        }
        return token
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}