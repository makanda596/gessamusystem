import express from 'express';
import { User } from '../models/Usermodel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { firstName, lastName, admNo, year, email, password } = req.body;

    try {
        if (!firstName || !lastName || !admNo || !email || !password) {
            return res.status(404).json({ message: "Please fill all the fields" });
        }

        // Checking for existing user
        const existingUser = await User.findOne({ admNo });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Creating the user
        const user = new User({
            firstName,
            lastName,
            admNo,
            year,
            email,
            password: hashPassword
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "User signed up successfully",
            user: {
                ...user._doc,
                password: undefined, // Hides password from the response
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res) => {
    const { admNo, password } = req.body;

    try {
        const user = await User.findOne({ admNo });
        if (!user) {
            return res.status(404).json({ message: "Invalid admission number" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined, // Hides password from the response
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
