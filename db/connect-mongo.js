const mongoose = require('mongoose');

const getConnection = async () => {
    try {

        const url = 'mongodb+srv://angelpuentes:Programmer1968@cluster0.ngavnjw.mongodb.net/jwt-g34?retryWrites=true&w=majority'
    
        await mongoose.connect(url);

        console.log('Conexión exitosa');
    } catch (error) {
        console.log(error);
        console.log('Hola este es el mensaje de coprobación');
    }

    module.exports = getConnection();
    
    
}