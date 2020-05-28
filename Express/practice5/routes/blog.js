const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const authUtil = require('../modules/middleware/authUtil');

router.post('/create',authUtil.checkToken,blogController.create);
router.get('/:id',authUtil.checkToken,blogController.search);
router.get('/search/All',authUtil.checkToken,blogController.searchAll);
router.delete('/:id',authUtil.checkToken,blogController.delete);

module.exports = router;