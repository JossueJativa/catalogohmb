const { Router } = require('express');
const { getCatalogo, getCatalogoById, updateCatalogo, saveCatalogo, deleteCatalogo } = require('../controllers/catalogo.controller');

const router = Router();

router.get('/', getCatalogo);
router.get('/:id', getCatalogoById);
router.post('/', saveCatalogo);
router.put('/:id', updateCatalogo);
router.delete('/:id', deleteCatalogo);

module.exports = router;