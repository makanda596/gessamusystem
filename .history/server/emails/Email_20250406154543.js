import  nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()
// const SMTP_Server = proccess.env.SMTP_Server
export const sendVerificationEmail = async (email, verificationCode) =>{

    try{
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_Server,
            port: process.env.Port,
            secure: false,
            auth: {
                user: process.env.Login,
                pass: process.env.password,
            },
        });
        
        await transporter.sendMail({
            from: 'oumab743@gmail.com',
            to: email,
            subject: "Verification Code",
            html: VERIFICATION_EMAIL_TEMPLATE,
            text: "reset your password", // Fallback for non-HTML clients

        })
        console.log(`email sent to ${email}`)
    }catch(error){
        throw new Error(`Email delivery failed: ${error.message}`);

    }


}


export const sendPasswordResetEmail = async (email)=>{

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_Server,
            port: process.env.Port,
            secure: false,
            auth: {
                user: process.env.Login,
                pass: process.env.password,
            },
        });

        await transporter.sendMail({
            from: 'oumab743@gmail.com',
            to: email,
            subject: "Reset Password ",
            html: VERIFICATION_EMAIL_TEMPLATE,
            text: "reset your password", // Fallback for non-HTML clients

        })
        console.log(`email sent to ${email}`)
    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);

    }
}

export const    sendRestPasswordEmail = async (email) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_Server,
            port: process.env.Port,
            secure: false,
            auth: {
                user: process.env.Login,
                pass: process.env.password,
            },
        });

        await transporter.sendMail({
            from: 'oumab743@gmail.com',
            to: email,
            subject: "Reset Password ",
            html: VERIFICATION_EMAIL_TEMPLATE,
            text: "reset your password", // Fallback for non-HTML clients

        })
        console.log(`email sent to ${email}`)
    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);

    }
}

sendRestPasswordEmail