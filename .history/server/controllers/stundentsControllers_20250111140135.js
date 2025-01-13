import { User } from "../models/Usermodel"

export const allStudents = async (req, res) => {
    try {
        const allStudents = await User.find({})
        if (!allStudents) {
            res.status(400).json({ message: "No students found" })
        }

        res.status(200).json(allStudents)
    } catch (error) {

    }
}