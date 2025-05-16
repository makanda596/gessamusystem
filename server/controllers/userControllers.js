import { User } from '../models/Usermodel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import { sendConfirmationEmail, sendPasswordResetEmail,  sendVerificationEmail, sendRestPasswordSucces, sendSuspiciousLoginEmail} from '../emails/Email.js';
import { validationResult } from 'express-validator';

export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    try {
        // Check for existing user
        const [existingUser, existingPhone] = await Promise.all([
            User.findOne({ email: String(email) }),
            User.findOne({ phoneNumber: String(phoneNumber) }),
        ]);

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already taken" });
        }

        // Hash the password securely
        const hashPassword = await bcrypt.hash(password, 10);

        // Generate avatar and verification token
        const avatarUrl = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(firstName + " " + lastName)}`;
        const verificationToken = crypto.randomBytes(2).toString("hex").toUpperCase();
        const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;

        // Create user
        const user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashPassword,
            avatar: avatarUrl,
            verificationToken,
            verificationTokenExpiresAt,
        });

        await user.save();
        await sendVerificationEmail(email, verificationToken);

        res.status(200).json({
            success: true,
            message: "User signed up successfully",
            user: {
                ...user._doc,
                password: undefined, // Never send back password
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const verifyEmail = async(req,res)=>{
    const {code} = req.body

    try {
        
        const user = await User.findOne({
             verificationToken:code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if(!user){
            return res.status(400).json({message:"the code already expired or invalid code"})
        }

        user.isVerified = true,
            user.verificationToken =undefined,
                user.verificationTokenExpiresAt = undefined,
       await user.save()
        await sendConfirmationEmail(user.email)

        res.status(400).json({message:"email verified succesfully please log in "})
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const EmailVerificationResend = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "The email does not exist" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified. Please login.' });
        }

        const verificationToken =  crypto.randomBytes(2).toString("hex").toUpperCase(); 
        const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;

        user.isVerified = true,
            user.verificationToken = verificationToken,
        user.verificationTokenExpiresAt = verificationTokenExpiresAt,
        await user.save(); 

        await sendVerificationEmail(email, verificationToken);

        res.status(200).json({
            message: "New verification code sent to your email",
            email: user.email 
        });

    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({
            message: "Error resending verification code",
            error: error.message
        });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.SECTRET_KEY, { expiresIn: "1d" })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email address" });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first",
                isVerified: false,
                userId: user._id
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
           
            user.loginAttempts +=1 ;
            if (user.loginAttempts >= 10){
                user.lockUntil = new Date(Date.now() + 15*60*1000)
                const ip =
                    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
                await sendSuspiciousLoginEmail(email, ip);
            }
            await user.save()
            console.log(user.loginAttempts)

           
            return res.status(400).json({ message: "Incorrect password" });
        }

        user.loginAttempts=0,
            user.lockUntil=null
            await user.save()
        res.status(200).json({
            message: "User logged in",
           
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            res.json({ message: "user not found" })
        }
        const userInfo = {
            ...user._doc
        }
        res.json(userInfo)
    }
    catch (error) {
        res.json(error.message)
    }
}
 
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
        res.clearCookie("refreshtoken", { httpOnly: true, secure: true, sameSite: "None" });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const checkAuth = async (req, res) => {
    try {
        // Ensure req.user exists (set by protectRoute middleware)
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Fetch user from the database excluding password
        const existingUser = await User.findById(req.user.id).select("-password");

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        res.status(200).json({ success: true, user: existingUser });
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "email does not exist" })
        }
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpires = Date.now() + 60 * 60 * 1000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpires
        await user.save()

        const RESET_URL = `https://gessamu.onrender.com/reset-password/${resetToken}`
        await sendPasswordResetEmail(user.email, RESET_URL)
        res.status(200).json({ message: "reset password link sent to your email check email " })
    }
    catch (error) {
        res.status(400).json(error.message)
    }

}

export const resetPassword = async (req, res) => {
   const {token} = req.params
   const {password} = req.body
   try{
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() },
    })
    if(!user){
        return res.status(400).json({message:"expired token on invalid"})
    }
       const hashPassword = await bcrypt.hash(password, 10)
       user.password = hashPassword;
       user.resetPasswordToken = undefined;
       user.resetPasswordExpiresAt = undefined;

       await user.save()
       await sendRestPasswordSucces(user.email)

       res.status(200).json({message:"succefull message sent"})
   }catch(error){
    res.status(400).json(error.message)
   }
}

export const getStudent = async (req, res) => {
    try {
        const student = await User.find({}).sort({ createdAt: -1 })
        if (!student) {
            return res.status(400).json({ message: "no student found" })
        }
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found with this ID" });
        }

        res.status(200).json({ message: "Account successfully deleted", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const countStudents = async (req, res) => {
    try {
        const count = await User.countDocuments(); // Count all students
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch student count" });
    }
};


export const update = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const avatar = req.file ? req.file.filename : null;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists. Please use a different one." });
            }
        }

        if (phoneNumber && phoneNumber !== user.phoneNumber) {
            const existingPhone = await User.findOne({ phoneNumber });
            if (existingPhone) {
                return res.status(400).json({ message: "Phone number already exists. Please use a different one." });
            }
        }

        let updatedFields = { firstName, lastName, email, phoneNumber };
        if (avatar) updatedFields.avatar = avatar;
        if (password) updatedFields.password = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedFields, { new: true });

        return res.status(200).json({
            message: "User updated successfully",
            updatedUser,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const countAlerts = async (req,res)=>{
    
    try{
        const alertCount = await Alert.findOne({userId:req.user.id })
        res.json(alertCount)
    }catch(error){
        res.json(error)
    }
}




//dfef