// src/models/tiendaModel.js

const fs = require('fs/promises');
const path = require('path');

// 💡 RUTA: Apunta al JSON de las ferreterías que actualizaste
const DB_PATH = path.join(__dirname, '../data/ferreterias.json'); 


/**
 * @class TiendaModel
 * @description Clase para manejar el acceso a los datos de las ferreterías.
 */
class TiendasModel { // 📚 Nombre de Clase actualizado
    
    // --- FUNCIONES AUXILIARES DE ARCHIVO ---

    async _readDB() {
        try {
            const data = await fs.readFile(DB_PATH, 'utf-8');
            // Como el JSON ya es un array plano, lo devolvemos directamente.
            return JSON.parse(data); 
        } catch (error) {
            console.error("Error al leer la base de datos de tiendas:", error);
            // Devuelve un array vacío si falla
            return []; 
        }
    }

    async _writeDB(data) {
        try {
            return fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Error al escribir en la base de datos de tiendas:", error);
            throw new Error("Fallo al actualizar el inventario de tiendas.");
        }
    }

    // --- LÓGICA DE DATOS ---

    async getTiendas() { 
        const data = await this._readDB();
        // Devuelve el array completo de tiendas
        return data; 
    }

    async getTiendaById(id) { 
        const allTiendas = await this.getTiendas();
        // Busca la tienda por ID (convertimos el ID a entero para comparar)
        return allTiendas.find(t => t.id === parseInt(id));
    }
   
    // ... Implementaciones de post, put y delete irían aquí ...

}

// Exportamos la nueva Clase 
module.exports = new TiendasModel();