require('dotenv').config()
const LoginUser = require('../models/login')
const SignupUser = require('../models/signup')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// let EMAIL ='jaiswalvidhi469@gmail.com'
// let PASSWORD ='ywjbteebutboyuxn'

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


let pass = 'ywjb teeb utbo yuxn'
// Function to send password reset email
const sendPasswordResetEmail = async (req, res) => {
   
    const {email} = req.body
   
    try {
        // Check if the user with the provided email exists in the database
        const user = await SignupUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
 
        // Generate a unique reset token (you can use any method for this)
        const resetToken = generateResetToken();
        console.log("reset token " , resetToken)
 
        // Store the reset token and expiry time in the user document
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + (3*3600000); // Token expires in 1 hour
        await user.save();
 
        // Send password reset email to the user
        await sendEmail(email, resetToken);
 
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
 }
 
 // Function to reset password
 const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    if(newPassword !== confirmPassword){
        return res.status(400).json({error : "Password and confirm password must be same."})
    }
 
    try {
        // Find the user with the provided reset token and ensure it's not expired
        const user = await SignupUser.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }, // Check if token is still valid
        });
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }
 
        // Reset the user's password after hashing
        const salt = await bcrypt.genSalt(10)//default value = 10
        const hash1 = await bcrypt.hash(newPassword, salt)
        const hash2 = await bcrypt.hash(confirmPassword, salt)
        user.password = hash1;
        user.cpassword = hash2;
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
 const sendEmail = async (email, resetToken) => {

     console.log(email, resetToken)
    try {
        let config = {
            service : 'gmail',
            auth : {
                user : process.env.EMAIL,
                pass : process.env.PASSWORD
            }
         }
        const transporter = nodemailer.createTransport(config)

        let message = {
            from : process.env.EMAIL,
            to : email,
            subject: 'Reset Password',
            html: `
                    <p>Click the following button to reset your password:</p>
                    <a href="https://example.com/reset?token=${resetToken}" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                `
        }
        transporter.sendMail(message).then(() => {
            return "you should receive an email"
        }).catch(error => {
            return error
        })
 
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
   
}

