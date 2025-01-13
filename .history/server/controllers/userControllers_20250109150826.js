
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