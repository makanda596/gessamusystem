import bcrypt from 'bcrypt';
import { Admin } from '../models/adminmodel.js';
import { User } from '../models/Usermodel.js';

export const adminSignup = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists
        const existingEmail = await Admin.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = new Admin({
            email,
            password: hashPassword,
        });

        await admin.save();

        res.status(200).json({
            success: true,
            message: "Admin signed up successfully",
            admin: {
                ...admin._doc,
                password: undefined, // Hide password in the response
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(400).json({ message: "Email does not exist" });
        }

        // Compare the password
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password" });
        }

        setCookieGenerateToken(res, User._id)
        await admin.save()

        res.status(200).json({
            message: "Admin logged in successfully",
            admin: {
                email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
