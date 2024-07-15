const { Router } = require('express');
const { getIngredientes, getIngredienteById, updateIngrediente, saveIngrediente, deleteIngrediente } = require('../controllers/ingredientes.controller');

const router = Router();

router.get('/', getIngredientes);
router.get('/:id', getIngredienteById);
router.post('/', saveIngrediente);
router.put('/:id', updateIngrediente);
router.delete('/:id', deleteIngrediente);

module.exports = router;