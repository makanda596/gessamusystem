import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const REFRESH_KEY = process.env.REFRESH_KEY

export const UserRefreshToken = async (res, userId) => {
    try {
        const token = jwt.sign({ userId }, REFRESH_KEY, { expiresIn: "1hour" })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Strict",
            secure: true,
            maxAge: 60 * 60 * 1000
        })
        if (!token) {
            return res.status(403).send({ message: "no refresh token found" })
        }
        return token

    } catch (error) {

    }
}