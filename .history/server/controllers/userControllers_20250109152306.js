
import express from 'express';
import { User } from '../models/Usermodel';

const app = express();

export const signup = async (req, res) => {
    const { firstName, lastName, admNo, email, password } = req.body

    try {
        if (!firstName, !lastName, !admNo, !email, !password) {
            res.status(404).json({ message: "please fill all the fields" })
        }
        //checking for the admno
        const existinguser = await User.find({ admNo })
        if (existinguser) {
            res.status(400).json({ message: "user already exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            admNo,
            email,
            password: hashPassword
        })
        await user.save()
        res.status(200).json({
            success: "true",
            message: "user signed in successfully",
            user: {
                firstName,
                lastName,
                admNo,
                email
            }
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const login = async (req, res) => {
    const { admNo, password } = req.body

    try {
        const user = await User.find({ admNo })
        if (!user) {
            res.status(404).send({ message: "invalid adm Number" })
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            res.status(400).json({ message: "incorrect password" })
        }

        await user.save()
        res.status(200).json({
            success: "true",
            message: "user logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}