const express = require('express');
const router = express.Router();
const degreeController = require('../app/api/controllers/degree.js');

router.post('/', degreeController.create);
router.get('/', degreeController.getAll);
router.get('/:degreeId', degreeController.getById);
router.put('/:degreeId', degreeController.update);
router.delete('/:degreeId', degreeController.delete);

module.exports = router;