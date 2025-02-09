const User = require("../models/user-model");
const bcrypt = require("bcryptjs")
const home = (req, res) => {
  res.status(200).send("hii");
};

// ! Registration Logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(`userExist-->`, userExist);

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res
      .status(201)
      .json({
        msg: "registration Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    // res.status(500).json({ msg: "Internal Server Error" });
    next(error);
  }
};

// ! login functionality
const login = async (req,res) => {
  try {
    const {email, password} = req.body;

    const userExist = await User.findOne({email});
    // * if user not exist
    if(!userExist) {
      return res.status(400).json({msg: "Invalid Credentials"})
    }

    //  ! compare Password
    // const user = await  bcrypt.compare(password,userExist.password);
    
    const user = await userExist.comparePassword(password);
    
    if(user){
      res
      .status(200)
      .json({
        msg: "login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({msg: "Invalid email or password"})
    }
  } catch (error) {
    res.status(500).json({msg: "Internal Server Error"});
  }
}


// ! User logic
const user = async (req,res) => {
  try {
    const userData = req.user;
    console.log(`userData via user route -->`,userData);
    res.status(200).json({userData});
    
  } catch (error) {
    console.log(`error from the user route ${error}`);
    
  }
}

module.exports = { home, register, login, user };
