import express from 'express';
import { User } from '../models/Usermodel.js';
import bcrypt from 'bcrypt';
import { UsersetCookieGenerateToken } from '../utilis/UsersetCookieGenerateToken.js';



export const signup = async (req, res) => {
    const { firstName, lastName, admNo, year, email, password } = req.body;

    try {
        // if (!firstName || !lastName || !admNo || !year || !email || !password) {
        // if (!firstName || !lastName || !admNo || !year || !email || !password) {
        //     return res.status(400).json({ message: "Please fill all the fields" });
        // }

        const existingUser = await User.findOne({ admNo });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // const avatarUrl = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(firstName + " " + lastName)}`;

        // Create the user
        const user = new User({
            firstName,
            lastName,
            admNo,
            year,
            email,
            password: hashPassword,
            // avatar: avatarUrl, // Save the avatar URL in the database
        });

        await user.save();

        // Send a response without exposing the password
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

        UsersetCookieGenerateToken(res, user)
        await user.save()
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined, // Hides password from the response
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server errorss", error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: "User logged out successfully" })
    }
    catch (error) {
        res.status(400).json({ message: "Internal server error", error: error.message });
    }
}

export const checkAuth = async (req, res) => {

    try {
        const existinguser = await User.findOne({ User: User._id }).select("-password");
        if (!existinguser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // res.status(200).json({ success: true, existinguser });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
