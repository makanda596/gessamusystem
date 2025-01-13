import { Task } from "../models/taskmodel.js"

export const makeTask = async (req, res) => {
    const { task } = req.body

    try {

        const newtask = new Task({
            task
        })
        await newtask.save()
        res.status(200).json({ message: "task already sent", newtask })
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
