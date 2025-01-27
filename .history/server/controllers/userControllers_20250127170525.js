import { User } from '../models/Usermodel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UsersetCookieGenerateToken } from '../utilis/UsersetCookieGenerateToken.js';
import { UserRefreshToken } from '../utilis/UserRefreshToken.js';
import { sendPasswordResetEmail, sendRestPasswordEmail } from '../mailtrap/Email.js';



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
        UserRefreshToken(res, user)
        await user.save()
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined,  // Hides password from the response
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server errorss", error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.clearCookie('refreshtoken')
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

        res.status(200).json({ success: true, existinguser });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "email does not exist" })
        }
        //send a refresh token to the user
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpires = Date.now() + 60 * 60 * 1000

        //update the user info
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpires
        await user.save()

        //sending the email to the user after saving the reset token and expires at
        sendPasswordResetEmail(user.email, `http://localhost:3000/reset-password/${resetToken}`)
        res.status(200).json({ message: "reset password link sent to your email" })
    }
    catch (error) {
        res.status(400).json(error.message)
    }

}

export const resetPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ message: "Password reset token expired or invalid" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        //changing the details of the user 
        user.password = hashedPassword,
            user.resetPasswordToken = undefined,
            user.resetPasswordExpiresAt = undefined
        await user.save()

        sendRestPasswordEmail(user.email)
        res.status(200).json({ message: "success" })
    } catch (error) {
        res.status(400).json(error.message)
    }
}