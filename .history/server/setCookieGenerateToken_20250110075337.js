import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from './models/Usermodel'

dotenv.config()

const SECTRET_KEY = process.env.SECTRET_KEY
export const setCookieGenerateToken = async (res, userId) => {

    try {
        const token = jwt.sign({ userId }, SECTRET_KEY, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60 * 1000,
        })
    } catch (error) {

    }
}