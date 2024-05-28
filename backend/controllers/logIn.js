import User from "../models/user.js"; 
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Please enter all the information");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found!");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Password does not match");
    }

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.email = email;
    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200)
      .cookie("token", token, options)
      .cookie("email", email, options)  // Set the email cookie
      .json({
        message: "You have successfully logged in",
        success: true,
        token,
        email,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export default logIn;
