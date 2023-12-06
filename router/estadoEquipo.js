const {Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {validationResult, check} = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['ACtivo', 'Inactivo']),
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

router.get('/', async function(req, res) {
    try {
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;