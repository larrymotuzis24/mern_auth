import User from "../models/user.model.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({username, email, password});
    try {
        console.log(req.body)
        await newUser.save();
        res.status(201).json({message:"User created sucsefully"});

    }
    catch(err){
        res.status(500).json(err.message)
    }


};