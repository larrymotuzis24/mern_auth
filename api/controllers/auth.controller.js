import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created sucsefully" });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Invalid Credentials"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "invalid username or password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password:hashedPassword, ...rest} = validUser._doc; 
    const expirationDate = new Date(Date.now() + 3600000);
    res
      .cookie("acces_token", token, { httpOnly: true, expires:expirationDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};