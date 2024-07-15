const fs = require('fs');
const path = require('path');
const Catalogo = require('../models/catalogo');
const Ingredientes = require('../models/ingredientes');

const catalogoDBPath = path.join(__dirname, '../database/catalogo.json');
const ingredientesDBPath = path.join(__dirname, '../database/ingredientes.json');

const readCatalogoFromFile = () => {
    if (!fs.existsSync(catalogoDBPath)) {
        return [];
    }
    const data = fs.readFileSync(catalogoDBPath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

const writeCatalogoToFile = (catalogo) => {
    fs.writeFileSync(catalogoDBPath, JSON.stringify(catalogo, null, 2));
};

const readIngredientesFromFile = () => {
    if (!fs.existsSync(ingredientesDBPath)) {
        return [];
    }
    const data = fs.readFileSync(ingredientesDBPath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

const getCatalogo = (req, res) => {
    const { limit = 10, desde = 0 } = req.query;
    const catalogo = readCatalogoFromFile();
    const paginatedCatalogo = catalogo.slice(Number(desde), Number(desde) + Number(limit));
    res.status(200).json({ total: parseInt(limit), catalogo: paginatedCatalogo, length: catalogo.length });
};

const getCatalogoById = (req, res) => {
    const { id } = req.params;
    const catalogo = readCatalogoFromFile();
    const item = catalogo.find(cat => cat.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.status(200).json(item);
};

const saveCatalogo = (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, id_ingredientes } = req.body;
    if (!nombre || !descripcion || !precio || !stock || !imagen || !id_ingredientes) {
        return res.status(400).json({ msg: 'Faltan campos por llenar' });
    }

    const catalogo = readCatalogoFromFile();
    const ingredientes = readIngredientesFromFile();

    if (catalogo.some(cat => cat.nombre === nombre)) {
        return res.status(400).json({ msg: 'El nombre ya existe' });
    }

    if (catalogo.some(cat => cat.imagen === imagen)) {
        return res.status(400).json({ msg: 'La imagen ya existe' });
    }

    for (let i = 0; i < id_ingredientes.length; i++) {
        if (!ingredientes.find(ing => ing.id === parseInt(id_ingredientes[i]))) {
            return res.status(400).json({ msg: 'El ingrediente no existe' });
        }
    }

    const id = catalogo.length ? catalogo[catalogo.length - 1].id + 1 : 1;
    const newCatalogo = new Catalogo(id, nombre, descripcion, precio, stock, imagen, id_ingredientes);

    catalogo.push(newCatalogo);
    writeCatalogoToFile(catalogo);

    res.status(201).json(newCatalogo);
};

const updateCatalogo = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen, id_ingredientes } = req.body;

    const catalogo = readCatalogoFromFile();
    const ingredientes = readIngredientesFromFile();
    const index = catalogo.findIndex(cat => cat.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    if (id_ingredientes) {
        for (let i = 0; i < id_ingredientes.length; i++) {
            if (!ingredientes.find(ing => ing.id === parseInt(id_ingredientes[i]))) {
                return res.status(400).json({ msg: 'El ingrediente no existe' });
            }
        }
    }

    const updatedCatalogo = { ...catalogo[index], nombre, descripcion, precio, stock, imagen, id_ingredientes };
    catalogo[index] = updatedCatalogo;
    writeCatalogoToFile(catalogo);

    res.status(200).json(updatedCatalogo);
};

const deleteCatalogo = (req, res) => {
    const { id } = req.params;
    const catalogo = readCatalogoFromFile();
    const newCatalogo = catalogo.filter(cat => cat.id !== parseInt(id));

    if (catalogo.length === newCatalogo.length) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    writeCatalogoToFile(newCatalogo);
    res.status(200).json({ msg: 'Producto eliminado' });
};

module.exports = {
    getCatalogo,
    getCatalogoById,
    saveCatalogo,
    updateCatalogo,
    deleteCatalogo
};
