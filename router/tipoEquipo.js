const {Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {validationResult, check} = require('express-validator');
const {validarJWT} = require('../middleweare/validar-jwt');
const {validarRolAdmin} = require('../middleweare/validar-rol-admin');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])
], async function(req, res) {

    try {
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;