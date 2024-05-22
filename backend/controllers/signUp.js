import User from "../models/user.js"; 
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async(req,res) => {
    try {
        const { name, email, password } = req.body;
    
        if (!(name&& email && password)) {
          return res.status(400).send("Please enter all the information");
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).send("User already exists with the same email");
        }
    
        const hashedPassword = await bcryptjs.hash(password, 10);
    
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
    
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        user.token = token;
        user.password = undefined;
        res.status(200).json({ message: "You have successfully registered", user });
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
}

export default signUp;