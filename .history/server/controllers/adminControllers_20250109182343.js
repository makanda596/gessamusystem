
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
        res.status(400).json(error.message)
    }
}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.find({ email })
        if (!admin) {
            res.status(400).json({ message: "email does not exist" })
        }

        const isPassword = await bcrypt.compare(password, admin.password)
        if (!isPassword) {
            res.status(400).json({ message: "wrong password" })
        }

        await admin.save()
        res.status(200).json({
            message: "admin logged in successfully",
            admin: {
                email
            }
        })
    }
    catch (error) {
        res.status(400).json(error.message)
    }
}