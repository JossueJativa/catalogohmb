const fs = require('fs');
const path = require('path');

const catalogoDB = path.join(__dirname, 'catalogo.json');
const ingredientesDB = path.join(__dirname, 'ingredientes.json');

const dbConnectionCatalogo = async() => {
    try {
        if (!fs.existsSync(catalogoDB)) {
            fs.writeFileSync(catalogoDB, JSON.stringify([]));
        }

        if (!fs.existsSync(ingredientesDB)) {
            fs.writeFileSync(ingredientesDB, JSON.stringify([]));
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConnectionCatalogo
}