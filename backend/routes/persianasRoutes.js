const express = require('express');
const router = express.Router();
const { getPersianas, createPersiana, updatePersiana, deletePersiana } = require('../controllers/persianasController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getPersianas);
router.post('/', createPersiana); // No protection for posting messages
router.put('/:id', protect, admin, updatePersiana);
router.delete('/:id', protect, admin, deletePersiana);

module.exports = router;
