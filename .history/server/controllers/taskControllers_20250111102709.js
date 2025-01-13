import { Task } from "../models/quizmode"

export const makeTask = async (req, res) => {
    const { task } = req.body

    try {
        const existingtask = await Task.findOne({ quiz })
        if (!existingtask) {
            res.status(400).json({ message: "Couldn't find" })
        }

        const newtask = new Task({
            task
        })
        await newtask.save()
        res.status(200).json({ message: "question already sent", newtask })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const takeTask = async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (!tasks) {
            res.status(400).json({ message: "no Tasks found" })
        }

        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export default router;