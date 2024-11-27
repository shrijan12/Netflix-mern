import { User } from "../models/user.js";
import bcryptjs from 'bcryptjs';
import { generateWebTokenAndSetCookie } from "../utils/generateToken.js";

//this is the register async function
export async function register(req, res) {
    try {
        //destructuring the request comming from body
        const {username, email, password} = req.body;

        //applying the first set of validations check
        if(!email || !password || !username){
            return res.status(400).json({success: false, message: "All the fields are required"});
        }
        //creating one variable to check the email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success: false, message: "Email Validation is failed"});
        }
        //check the password length 
        if(password.length < 6){
            return res.status(400).json({success: false, message: "Password should be least 6 characters"});
        }
        //call the user model to check as if the email already exists
        const checkExistingUser = await User.findOne({email: email});

        if(checkExistingUser){
            return res.status(400).json({success: false, message: "User with the email already exists"});
        }

        //call the user model to check as if username already exists
        const checkExistingUsername = await User.findOne({username: username});
        if(checkExistingUsername){
            return res.status(400).json({success: false, message: "User with the username already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        
        const hashedPassword = await bcryptjs.hash(password, salt);

        const profilePics = ["/logo1.png", "/logo2.png", "/logo3.png"];

      const image = profilePics[Math.floor(Math.random() * profilePics.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image: image
        });

       
        generateWebTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        //remove the password frm the response
        return res.status(201).json({
            success: "true",
            user: {
                ...newUser._doc,
                password: " "
            }
        })

        
    } catch (error) {
        console.log("Error in authController", error.message);
        res.status(500).json({success: false, message: "An Iternal Server issue"});
    }
}

//this is the login async function
export async function login(req, res) {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({success: false, message: "One of the field is empty, please do check it out"});
        }

        const matchUsername = await User.findOne({username: username});
        const matchPassword = await User.findOne({password: password});

        if(matchPassword && matchUsername){
            return res.status(201).json({success: true, message: "User logged in"});
        }

    } catch (error) {
        console.log(error);
    }
}


export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success: true, message: "Logged out sucessfully"});
    } catch (error) {
     console.log("Error in logout controller", error);
     res.status(500).json({success:false, message:"Internal Server Error"});   
    }
}

