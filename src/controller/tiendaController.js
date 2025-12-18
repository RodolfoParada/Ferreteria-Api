// src/controllers/tiendaController.js

// 1. Necesitamos importar el modelo para poder usar sus funciones
const tiendasModel = require('../model/tiendaModel'); 

const tiendasController = {

    // Método para obtener y enviar todas las tiendas
    getTiendas: async (req, res) => {
        try {
            // 💡 LLAMADA AL MODELO: Obtenemos el array de ferreterías
            const tiendas = await tiendasModel.getTiendas();
            
            // 📤 RESPUESTA: Enviamos el array como JSON al cliente (código 200 OK por defecto)
            res.json(tiendas); 
            
        } catch (error) {
            console.error('Error en el controlador al obtener tiendas:', error);
            // 🚨 Manejo de Errores: Enviamos una respuesta de error al cliente
            res.status(500).json({ 
                message: 'Error interno del servidor al procesar la solicitud de tiendas.', 
                error: error.message 
            });
        }
    },
    
    // Aquí iría getTiendaById, etc.
};

module.exports = tiendasController; 