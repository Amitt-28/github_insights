const express = require('express');
const router = express.Router();
const { analyzeRepo, getRepoById, getUserRepos } = require('../controllers/repoController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeRepo);
router.get('/:id', protect, getRepoById);
router.get('/', protect, getUserRepos);

module.exports = router;
