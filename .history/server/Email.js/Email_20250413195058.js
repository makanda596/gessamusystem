import  nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, SIGNUP_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./Emailtemplates.js";

dotenv.config()
// const SMTP_Server = proccess.env.SMTP_Server
export const sendVerificationEmail = async (email, verificationToken) =>{

    try{
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 465,
            secure: true,
            auth: {
                user: "89b16e001@smtp-brevo.com",
                pass: "jY4tGZ8DxbsE7Smd",
            },
        });

        
        await transporter.sendMail({
            from: 'oumab743@gmail.com',
            to: email,
            subject: "Verification Code",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken),
            text: "reset your password", // Fallback for non-HTML clients

        })
        console.log(`email sent to ${email}`)
    }catch(error){
        throw new Error(`Email delivery failed: ${error.message}`);

    }


}


export const sendPasswordResetEmail = async (email, RESET_URL)=>{

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 465,
            secure: true,
            auth: {
                user: "8a4fc5001@smtp-brevo.com",
                pass: "NTMDy2H5w0KdVJ13",
            },
        });

        await transporter.sendMail({
            from: 'gessamusuport@gmail.com',
            to: email,
            subject: "Reset Password ",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{RESET_URL}", RESET_URL),
            text: "reset your password", 

        })
        console.log(`email sent to ${email}`, RESET_URL)
    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);

    }
}

export const    sendRestPasswordEmail = async (email) => {

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 465,
            secure: true,
            auth: {
                user: "89b16e001@smtp-brevo.com",
                pass: "jY4tGZ8DxbsE7Smd",
            },
        });

        await transporter.sendMail({
            from: 'oumab743@gmail.com',
            to: email,
            subject: "Reset Password ",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            text: "reset your password", // Fallback for non-HTML clients

        })
    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);

    }
}

export const sendConfirmationEmail = async (email) => {
    const recipient = email
    try {
       
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 465,
            secure: true,
            auth: {
                user: "89b16e001@smtp-brevo.com",
                pass: "jY4tGZ8DxbsE7Smd",
            },
        });
        const subject = "Account confirmation"; 


        await transporter.sendMail({
            from: 'oumab743@gmail.com',
            to: recipient,
            subject,
            html: SIGNUP_SUCCESS_TEMPLATE.replace("{email}", email),
            text: subject,
        });
console.log(email)
    } catch (error) { 
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
}