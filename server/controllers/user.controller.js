
export const refreshUser = async (req, res) => {
    try {

        res.status(200).json(
            {
                statusCode: 200,
                user: req.user
            });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
