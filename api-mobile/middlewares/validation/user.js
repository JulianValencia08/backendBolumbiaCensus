const { response } = require('express');
const {check, validationResult} = require('express-validator');

exports.validateUserSignUp = [
    check('fullname').trim().not().isEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('Ingresa un nombre valido')
    .isLength({min: 3, max: 20}).withMessage('El nombre debe ser entre 3 y 20 caracteres'),
    check('email').normalizeEmail().isEmail().withMessage('Correo invalido'),
    check('password').trim().not().isEmpty().withMessage('La clave debe ser entre 8 y 20 caracteres').isLength({min: 8, max: 20}).withMessage('La clave debe ser entre 8 y 20 caracteres'),
    check('confirmPassword').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Las claves deben ser iguales');
        }
        return true;
    }),
];

exports.userValidation = (request, response, next) => {
    const result = validationResult(request).array();
    if(!result.length){
        return next();
    }
    const error = result[0].msg;
    response.json({success: false, message: error})
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('correo / contraseña son necesarios'),
    check('password').trim().not().isEmpty().withMessage('correo / contraseña son necesarios'),
];