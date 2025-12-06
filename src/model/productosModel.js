// src/models/productosModel.js

const fs = require('fs/promises');
const path = require('path');

// 💡 RUTA CORREGIDA: Desde src/model, vamos a src/data/productos.json
const DB_PATH = path.join(__dirname, '../data/productos.json');


/**
 * @class ProductosModel
 * @description Clase para manejar el acceso a los datos del inventario.
 */
class ProductosModel {

    // --- FUNCIONES AUXILIARES DE ARCHIVO ---

    async _readDB() {
        try {
            const data = await fs.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer la base de datos mock:", error);
            // Devuelve un objeto vacío si falla la lectura/parsing
            return {}; 
        }
    }

    async _writeDB(data) {
        // En un modelo Mock, es crucial manejar el error de escritura
        try {
            return fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Error al escribir en la base de datos mock:", error);
            throw new Error("Fallo al actualizar el inventario.");
        }
    }

    // --- LÓGICA DE DATOS ---

    // 💡 APLANA el JSON para obtener un array simple de todos los productos
    _flattenProducts(data) {
        let allProducts = [];
        for (const categoriaKey in data) {
            const categoria = data[categoriaKey];
            for (const subgroupKey in categoria) {
                const subgroup = categoria[subgroupKey];
                // Asegurar que 'subgroup' es un array antes de usar forEach
                if (Array.isArray(subgroup)) {
                    subgroup.forEach(producto => {
                        allProducts.push({
                            ...producto,
                            categoria: categoriaKey, 
                            subgrupo: subgroupKey
                        });
                    });
                }
            }
        }
        return allProducts;
    }

    // ----------------------------------------------------
    // READ (GET)
    async getProductos() { // Renombrado a getProductos para ser más claro
        const data = await this._readDB();
        return this._flattenProducts(data);
    }

    async getProductoById(id) { // Renombrado a getProductoById
        const allProducts = await this.getProductos();
        // Buscar por ID en el array aplanado
        return allProducts.find(p => p.id === parseInt(id));
    }
   
    // 💡 Necesitarás implementar postProducto, putProducto y deleteProducto
    // que usen _readDB, la lógica de búsqueda/modificación compleja y _writeDB.

}

// Exportamos la Clase para que pueda ser utilizada


module.exports = new ProductosModel(); 