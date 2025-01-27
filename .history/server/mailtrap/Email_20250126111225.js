import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./Emailtemplates.js"
import { mailtrapClient, sender } from "./Mailtrap.configu.js"

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            subject: "reset your password",
            category: "password reset"
        })
        console.log("welcome email sent succesfully for the password reset", response)

    } catch (error) {
        console.error(`Error sending password reset email`)

    }
}

export const sendRestPasswordEmail = async (email) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            subject: "reset your password",
            category: "password reset success"
        })
        console.log("reset password email sent succesfully", response)
    }}