const express = require('express');

const router = express.Router();
const { createUser, userSignIn } = require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const { isAuth } = require('../middlewares/auth');

const User = require('../models/user');

const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const fileFilter = (req, file, callback) =>{
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    }else{
        callback('imagen invalida', false);
    }
}
const uploads = multer({storage, fileFilter})

router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.post('/upload-profile', isAuth, uploads.single('profile') , async(req,res) =>{
    const {user} = req
    if(!user) return res.status(401).json({success: false, message: 'No esta autorizado para estar aqui'});

    try {
        const profileBuffer = req.file.buffer;
        const {width, height} = await sharp(profileBuffer).metadata();
        const avatar = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer();

        await User.findByIdAndUpdate(user._id, {avatar});
        res.status(201).json({success: true, message: 'Se ha actualizado correctamente la imagen' })
    } catch (error) {
        res.status(500).json({success: false, message: 'Error en el Servidor' })
        console.log('Error al subir la imagen, intenta nuevamente',error.message)
    }

})

module.exports = router;