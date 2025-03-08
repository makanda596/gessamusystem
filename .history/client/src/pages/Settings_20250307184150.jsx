export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found with this ID" });
        }

        res.status(200).json({ message: "Account successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
