const LoginUser = require('../models/login')
const SignupUser = require('../models/signup')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const crypto = require('crypto');

function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
}


//create token method
const createToken = (_id) => {   
   return jwt.sign({_id } , process.env.SECRET, {expiresIn : '3d'})
}

//for login
const loginUser = async (req,res) => {
    const {email, password} = req.body
    console.log(email,password)
    try {
        const user = await LoginUser.login(email,password)
        
        //create token
        const token = createToken(user._id)
        const userInfo = {
         _id: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         companyName : user.companyName,
         gst : user.gst,
         email: user.email,

         // Add other fields you want to send
        };
        res.status(200).json({user:userInfo, token})
     }
     catch(error){
        res.status(400).json({error  : error.message})
     }
    
}

//for sign up
const signUpUser = async (req, res) => {
    const {firstName, lastName, companyName, gst,email, password, cpassword } = req.body;

    try {
       const user = await SignupUser.signup(firstName, lastName, companyName, gst,email, password, cpassword)

       //create token
       const token = createToken(user._id)
       const userInfo = {
         _id: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         companyName : user.companyName,
         gst : user.gst,
         email: user.email,
         // Add other fields you want to send
        };
       res.status(200).json({user:userInfo, token}) 
    }
    catch(error){
       res.status(400).json({error  : error.message})
    }
}


// Function to send password reset email
async function sendPasswordResetEmail(req, res) {
   const { email } = req.body;

   try {
       // Check if the user with the provided email exists in the database
       const user = await SignupUser.findOne({ email });
       if (!user) {
           return res.status(404).json({ error: 'User not found' });
       }

       // Generate a unique reset token (you can use any method for this)
       const resetToken = generateResetToken();

       // Store the reset token and expiry time in the user document
       user.resetToken = resetToken;
       user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
       await user.save();

       // Send password reset email to the user
       sendEmail(email, resetToken);

       res.status(200).json({ message: 'Password reset email sent successfully' });
   } catch (error) {
       console.error('Error sending password reset email:', error);
       res.status(500).json({ error: 'Internal server error' });
   }
}

// Function to reset password
async function resetPassword(req, res) {
   const { token } = req.params;
   const { newPassword, confirmPassword } = req.body;

   try {
       // Find the user with the provided reset token and ensure it's not expired
       const user = await SignupUser.findOne({
           resetToken: token,
           resetTokenExpiry: { $gt: Date.now() }, // Check if token is still valid
       });
       if (!user) {
           return res.status(400).json({ error: 'Invalid or expired reset token' });
       }

       // Reset the user's password
       user.password = newPassword;
       user.resetToken = undefined;
       user.resetTokenExpiry = undefined;
       await user.save();

       res.status(200).json({ message: 'Password reset successfully' });
   } catch (error) {
       console.error('Error resetting password:', error);
       res.status(500).json({ error: 'Internal server error' });
   }
}

// Function to send password reset email
async function sendEmail(email, resetToken) {
   try {
       const transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
               user: 'paruljansie@gmail.com', // Your email address
               pass: 'password' // Your email password
         }
       });

       // Send email with password reset instructions
       await transporter.sendMail({
           from: 'paruljansie@gmail.com',
           to: email,
           subject: 'Password Reset Request',
           text: `Click the following link to reset your password: ${resetToken}`,
       });
   } catch (error) {
       console.error('Error sending password reset email:', error);
       throw new Error('Failed to send password reset email');
   }
}


module.exports = {
    loginUser,
    signUpUser,
    resetPassword,
    sendPasswordResetEmail,
     resetPassword 
}

