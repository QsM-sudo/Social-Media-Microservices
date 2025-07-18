const logger = require("../utils/logger");
const User = require("../models/user");
const { validateSignup } = require("../utils/validation");

// user registration

const SignupUser = async (req, res) => {
    logger.info("Signing up user");
    try {
        //validate the schema
        const { error } = validateSignup(req.body);
        if(error) {
            logger.warn("Validation error", error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const {username, email,password} = req.body;

        let user = await User.findOne({ $or: [{email}, {username}]});
        if(user){
            logger.warn("User already exists");
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        user = new User({username, email, password })
        await user.save();
        logger.warn("User saved successfully",user._id); 
        

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error !",
            sucesss: false,
        });
    }
};