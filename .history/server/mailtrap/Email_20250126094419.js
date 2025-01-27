import { mailtrapClient, sender } from "./Mailtrap.configu"

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
    } catch (error) {
        console.error(`Error sending password reset email`)

    }
}