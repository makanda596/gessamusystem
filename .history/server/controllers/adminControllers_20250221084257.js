import bcrypt from 'bcryptjs';
import { Admin } from '../models/adminmodel.js';
import { AdminsetCookieGenerateToken } from '../utilis/AdminsetCookieGenerateToken.js';

export const adminSignup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingEmail = await Admin.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10); 

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
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({ message: "Internal server error", error: error.message });
    }
};

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Email does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Generate token and set cookie
        AdminsetCookieGenerateToken(res, admin);

        // Store admin details in session
        req.session.admin = {
            id: admin._id,
            email: admin.email,
        };
        res.status(200).json({
            message: "Admin logged in successfully",
            admin: req.session.admin,
        });
    } catch (error) {
        res.status(400).json({ message: "Internal server error", error: error.message });
    }
};

export const adminLogout = async (req, res) => {
    try {
              // Destroy sessio
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Error logging out" });
            }
            res.status(200).json({ message: "Admin logged out successfully" });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const  admDetails = async (req,res)=>{
    if(req.session.admin){
        res.send({
            message:"profile details",
            admin:req.session.admin,
            email:req.session.email
        })
    }
    else{
        res.status(401).json({message:"you need to log in first"})
    }
}