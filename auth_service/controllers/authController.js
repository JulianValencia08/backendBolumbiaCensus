const { User } = require("../models/Users");
const { issueJWT } = require('../utils/CreateJwt');
const { validateLoginCredential } = require('../utils/ValidateCredentials');
const { verifyJwt } = require("../utils/VerifyJwt")
const { generateEncryptedCredentials, validateCredentials } = require("../utils/PasswordEncrypt"); // TODO: Implement this function

const registerController = async (req, res, next) => { 
    console.log(req.body);
    const areValidCredentials = validateLoginCredential(req.body.ecn, req.body.cfn);
    if (!areValidCredentials) res.status(401).json({ success: false, msg: "Invalid credentials" });
    const newUser = new User({ 
        name: req.body.name,
        email: req.body.email,
        direction: req.body.direction,
        ecn: req.body.ecn,
        cfn: req.body.cfn,
    });
    newUser.save()
        .then((user) => {
            const jwt = issueJWT(user);
            res.json({ 
                success: true, 
                user: user, 
                token: jwt.token, 
                expiresIn: jwt.expires 
            });
        })
        .catch ((err) => { 
            console.log(err);
        }); 
} 

const loginController = async (req, res, next) => { 
    const areValidCredentials = validateLoginCredential(req.body.ecn, req.body.cfn);
    if (!areValidCredentials) res.status(401).json({ success: false, msg: "Invalid credentials" });
    User.findOne({ cfn: req.body.cfn })
        .then((user) => {
            if(!user) res.status(401).json({ success: false, msg: "could not find user" });
            if(user.ecn != req.body.ecn) res.status(401).json({ success: false, msg: "Invalid credentials" });
            const tokenObject = issueJWT(user);
            res.status(200).json({ 
                    user: user, 
                    success: true, 
                    token: tokenObject.token, 
                    expiresIn: tokenObject.expires 
            }); 
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Internal server error" });
        });
};  


const validateTokenController = async (req, res) => {
    const isValidToken = verifyJwt(req.headers.jwt)
    if(!isValidToken) res.status(401).json({ success: false, message: "Invalid Token" });
    res.status(200).json({ success: true, message: "Valid Token" });
 } 


module.exports = { registerController, loginController, validateTokenController };