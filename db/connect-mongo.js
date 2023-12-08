const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const url =
      "mongodb+srv://angelpuentes:Programmer1968@cluster0.ngavnjw.mongodb.net/jwt-g34?retryWrites=true&w=majority";

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conexión exitosa");
  } catch (error) {
    console.error(error);
    console.log("Error al intentar conectar a la base de datos");
  }
};

// Exporta la función sin ejecutarla esta mal exportada
module.exports = getConnection();