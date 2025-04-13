import  nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()
// const SMTP_Server = proccess.env.SMTP_Server
export const sendVerificationEmail= async () =>{

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
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            text: "reset your password", // Fallback for non-HTML clients

        })
        console.log("email sent to" ${email})
    }catch(error){
        throw new Error(`Email delivery failed: ${error.message}`);

    }


}

