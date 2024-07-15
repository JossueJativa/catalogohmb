const fs = require('fs');
const path = require('path');
const Ingredientes = require('../models/ingredientes');

const ingredientesDBPath = path.join(__dirname, '../database/ingredientes.json');

const readIngredientesFromFile = () => {
    if (!fs.existsSync(ingredientesDBPath)) {
        return [];
    }
    const data = fs.readFileSync(ingredientesDBPath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

const writeIngredientesToFile = (ingredientes) => {
    fs.writeFileSync(ingredientesDBPath, JSON.stringify(ingredientes, null, 2));
};

const getIngredientes = (req, res) => {
    const { limit = 10, desde = 0 } = req.query;
    const ingredientes = readIngredientesFromFile();
    const paginatedIngredientes = ingredientes.slice(Number(desde), Number(desde) + Number(limit));
    res.status(200).json({ total: parseInt(limit), ingredientes: paginatedIngredientes, length: ingredientes.length });
};

const getIngredienteById = (req, res) => {
    const { id } = req.params;
    const ingredientes = readIngredientesFromFile();
    const ingrediente = ingredientes.find(ing => ing.id === parseInt(id));
    if (!ingrediente) {
        return res.status(404).json({ msg: 'Ingrediente no encontrado' });
    }
    res.status(200).json(ingrediente);
};

const saveIngrediente = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ msg: 'Faltan campos por llenar' });
    }

    const ingredientes = readIngredientesFromFile();

    if (ingredientes.some(ing => ing.name === name)) {
        return res.status(400).json({ msg: 'El nombre ya existe' });
    }

    const id = ingredientes.length ? ingredientes[ingredientes.length - 1].id + 1 : 1;
    const newIngrediente = new Ingredientes(id, name);

    ingredientes.push(newIngrediente);
    writeIngredientesToFile(ingredientes);

    res.status(201).json(newIngrediente);
};

const updateIngrediente = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: 'Faltan campos por llenar' });
    }

    const ingredientes = readIngredientesFromFile();
    const index = ingredientes.findIndex(ing => ing.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ msg: 'Ingrediente no encontrado' });
    }

    ingredientes[index].name = name;
    writeIngredientesToFile(ingredientes);

    res.status(200).json(ingredientes[index]);
};

const deleteIngrediente = (req, res) => {
    const { id } = req.params;
    let ingredientes = readIngredientesFromFile();
    const newIngredientes = ingredientes.filter(ing => ing.id !== parseInt(id));

    if (ingredientes.length === newIngredientes.length) {
        return res.status(404).json({ msg: 'Ingrediente no encontrado' });
    }

    writeIngredientesToFile(newIngredientes);
    res.status(200).json({ msg: 'Ingrediente eliminado' });
};

module.exports = {
    getIngredientes,
    getIngredienteById,
    saveIngrediente,
    updateIngrediente,
    deleteIngrediente
};
