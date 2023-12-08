const {Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {validationResult, check} = require('express-validator');
const {validarJWT} = require('../middleweare/validar-jwt');
const {validarRolAdmin} = require('../middleweare/validar-rol-admin');

const router = Router();

router.post('/',[validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['En uso', 'En bodega', 'Depreciado'])
], async function(req, res) {

    try {
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:estadoEquipoId', [validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])
    ], async function(req, res) {

    try {

        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo) {
            return res.status(400).send('Estado not found');
        }
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    }catch(error){
        console.log(error);
    }
});

module.exports = router;