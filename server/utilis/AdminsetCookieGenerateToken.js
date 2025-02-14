import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECTRET_KEY = process.env.SECTRET_KEY
export const AdminsetCookieGenerateToken = async (res, adminId) => {

    try {
        const token = jwt.sign({ adminId }, SECTRET_KEY, { expiresIn: "1day" })

        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60 * 1000,
        })
        if (!token) {
            res.status(404).json({ message: "token not provided" })
            return 0;
        }
        return token
    } catch (error) {
        res.status(404).json(error.message)
    }
}