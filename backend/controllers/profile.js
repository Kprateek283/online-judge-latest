import User from "../models/user.js";

const profile = async (req, res) => {
    try {
        console.log("Cookies:", req.cookies); 
        const userEmail = req.cookies.email;

        if (!userEmail) {
            return res.status(400).json({ message: "Email cookie is missing" });
        }

        const userProfile = await User.findOne({ email: userEmail });

        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        const { _id, password, ...filteredUserProfile } = userProfile.toObject();

        return res.status(200).json({ success: true, profile: filteredUserProfile });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export default profile;
