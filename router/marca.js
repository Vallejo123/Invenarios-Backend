const { Router } = require("express");
const Marca = require("../models/Marca");
const { validationResult, check } = require("express-validator");

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    check("estado", 'El estado debe ser "Activo" o "Inactivo"').isIn([
      "Activo",
      "Inactivo",
    ]),
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      let marca = new Marca();
      marca.nombre = req.body.nombre;
      marca.estado = req.body.estado;
      marca.fechaCreacion = new Date();
      marca.fechaActualizacion = new Date();

      marca = await marca.save();

      res.status(201).json({ mensaje: "Marca creada correctamente", marca });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrió un error al procesar la solicitud" });
    }
  }
);

router.get("/", async function (req, res) {
  try {
    const marcas = await Marca.find();
    res.send(marcas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrió un error 2");
  }
});

module.exports = router;
