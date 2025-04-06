const express = require('express');
const searchApi = require('../apps/api_controllers/searchApiController');
const authMiddleware = require('../middlewares/authMiddleware');
const DatabaseApiController = require('../apps/api_controllers/databaseApiController');

const router = express.Router();
const authMiddlewareInstance = new authMiddleware(); // Khởi tạo middleware với SECRET_KEY từ biến môi trường
const searchApiController = new searchApi();
const databaseApi = new DatabaseApiController();

router.get('/search/:tableName', authMiddlewareInstance.optionalToken, searchApiController.searchInDB);


router.get('/table', databaseApi.findAllTableNameInDB);
router.get('/table/:tableName/attributes', databaseApi.findAttributesInTable);
router.get('/table/:tableName/attributes-name-only', databaseApi.findAttributesInTableOnlyName);


module.exports = router;
