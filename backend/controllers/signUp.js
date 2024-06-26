import User from "../models/user.js"; 
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        const { name, email, password, role, secretKey } = req.body;

        if (!(name && email && password && role)) {
            return res.status(400).json({ message: "Please enter all the information" });
        }

        if (role === 'Admin' && secretKey !== '2853') {
            return res.status(400).json({ message: "Incorrect secret key" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with the same email" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            problemsAttempted: 0,
            problemsSolved: 0,
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });

        user.token = token;
        user.password = undefined;

        res.status(200).json({ message: "You have successfully registered", user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default signUp;
