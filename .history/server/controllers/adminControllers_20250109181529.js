
export const adminSignup = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingEmail = await Admin.find({ email })
        if (!existingEmail) {
            res.status(400).json({ message: "email already exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const admin = new Admin({
            email,
            password: hashPassword
        })

        await admin.save()
        res.status(200).json({
            success: true,
            message: "admin signup succesfully",
            admin: {
                ...admin._doc,
                password: undefined
            }
        })
    } catch (error) {

    }
} 