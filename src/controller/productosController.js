

const modelProductos = require('../model/productosModel');

module.exports = {

    // 💡 CAMBIO CRUCIAL: Convertir el handler a ASYNC
    getProductos: async (req, res) => {
        try {
            // 💡 Usar AWAIT para esperar que la Promesa se resuelva
            const result = await modelProductos.getProductos();
            
            res.status(200).json({ data: result });
            
        } catch (error) {
            // Manejar errores de lectura de archivo/JSON
            res.status(500).json({ error: error.message });
        }
    },

    // 💡 También debes aplicar 'async' y 'await' a getProductosById
    getProductosById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await modelProductos.getProductoById(id);
            
            if (!result) { 
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            
            res.status(200).json({ data: result });
        } catch (error) {
             res.status(500).json({ error: error.message });
        }
    }
}