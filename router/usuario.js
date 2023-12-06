const {Router } = require('express');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');
const {validationResult, check} = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['Administrador', 'Docente']),
    check('estado', 'invalid.estado').isIn(['ACtivo', 'Inactivo']),
], async function(req, res) {

    try {
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }
        const existeUsuario = await Usuario.findOne({email: req.body.email});
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;

        usuario.rol = req.body.rol;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);



    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/', async function(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

//router.put('/:usuarioId')
//router.delete('/usuarioId')

module.exports = router;