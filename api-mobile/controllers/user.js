const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = async (request, response) =>{
    const {fullname, email, password} = request.body;

    const isNewUser = await User.isThisEmailInUse(email);

    if(!isNewUser) return response.json({
       success: false, 
       message:'El correo actualmente se encuentra en uso'
    });

    const user = await User({
    fullname,
    email,
    password,
    });
    await user.save();
    response.json(user);
}

exports.userSignIn = async (request, response) => {
    const {email, password} = request.body
    const user = await User.findOne({email});

    if(!user) return response.json({success: false, message: 'correo y/o contraseña son incorrectos'});

    const isMatch = await user.comparePassword(password)
    if(!isMatch) return response.json({success: false, message: 'correo y/o contraseña son incorrectos'});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    response.json({success: true, user, token});

};