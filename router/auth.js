const {Router } = require('express');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');
const {validationResult, check} = require('express-validator');
const {generarJWT} = require('../helpers/jwt');

const router = Router();

router.post('/', [
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty()
], async function(req, res) {

    try {
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        const usuario = await Usuario.findOne({email: req.body.email});
        if (!usuario) {
            return res.status(400).json({mensaje: 'Usuario no encontrado'});
        }

        //validar contraseñas
        const esIgual = bycript.compareSync(req.body.password, usuario.password);
        if (!esIgual) {
            return res.status(400).json({mensaje: 'Usuario no encontrado'});
        }   
        
        //generar token
        const token = generarJWT(usuario);

        res.json({
            _id: usuario.id, nombre: usuario.nombre,
            rol: usuario.rol, email: usuario.email, access_token: token 
    });

    } catch (errors) {
        console.log(errors);
        res.status(500).json({mensaje: 'Iternal server error'});
    }
    });

    module.exports = router;