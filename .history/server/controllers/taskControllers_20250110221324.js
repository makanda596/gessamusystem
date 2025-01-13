import { Quiz } from "../models/quizmode"

export const makeQuiz = async (req, res) => {
    const { quiz } = req.body

    try {
        const existingquiz = await Quiz.find({ quiz })
        if (!existingquiz) {
            res.status(400).json({ message: "Couldn't find" })
        }

        const newquiz = new Quiz({
            quiz
        })
        await newquiz.save()
        res.status(200).json({ message: "question already sent", newquiz })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const takeTask = async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (!tasks) {
            res.status(400).json({ message: "no questions found" })
        }

        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json(error.message)
    }
}