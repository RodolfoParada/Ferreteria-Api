const express = require('express');
const productosRoutes = require('./src/router/productosRutes.js');

const app = express();
const port = 3000; 


app.use(express.json());

app.use('/api/productos', productosRoutes);


// iniciar el servidor
app.listen(port, ()=>{
    console.log("Servidor iniciado en http://localhost:" + port);
})