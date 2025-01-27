import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const REFRESH_KEY = process.env.REFRESH_KEY

export const UserRefreshToken = async (res, userId) => {
    try {
        const refreshtoken = jwt.sign({ userId }, REFRESH_KEY, { expiresIn: "1hour" })

        res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60 * 1000
        })
        if (!token) {
            return res.status(403).send({ message: "no refresh token found" })
        }
        return refreshtoken

    } catch (error) {

    }
}