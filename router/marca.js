const {Router } = require('express');
const Marca = require('../models/Marca');
const {validationResult, check} = require('express-validator');
const {validarJWT} = require('../middleweare/validar-jwt');
const {validarRolAdmin} = require('../middleweare/validar-rol-admin');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function(req, res) {

    try {
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/', [validarJWT], async function(req, res) {
    try {
        const marcas = await Marca.find();
        res.send(marcas);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error 2');
    }
});

router.put('/:marcaId', [validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    ], async function(req, res) {

    try {

        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({mensaje: errors.array()});
        }

        let marca = await Marca.findById(req.params.marcaId);
        if (!marca) {
            return res.status(400).send('Marca not found');
        }
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();
        marca = await marca.save();
        res.send(marca);

    }catch(error){
        console.log(error);
    }
});

module.exports = router;