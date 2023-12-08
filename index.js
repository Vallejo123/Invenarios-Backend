const express = require('express');
//import helmet from "helmet";
const { getConnection } = require('./db/connect-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express()
//Use helmet!
//app.use(helmet());
const host = '0.0.0.0';
const port = process.env.PORT;  

app.use(cors());

getConnection;

app.use(express.json());



app.use('/usuario', require('./router/usuario'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/auth', require('./router/auth'));

app.listen(port, host, () => {
    console.log(`Aplicación ejecutando en el puerto ${port}`);
});