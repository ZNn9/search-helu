const express = require('express');
const searchApi = require('../apps/api_controllers/searchApiController');
// const AuthMiddleware = require('../middlewares/authMiddleware');
const DatabaseApiController = require('../apps/api_controllers/databaseApiController');

const router = express.Router();
const searchApiController = new searchApi();
const databaseApi = new DatabaseApiController();
// const authMiddleware = new AuthMiddleware();

// const searchLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 phút
//     max: 100, // Tối đa 100 yêu cầu
//     message: "Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau."
// });

// GET /api/search/account/&columns=id,name,email&name=John
router.get('/search/:tableName', searchApiController.searchInDB);
// router.get('/search', authMiddleware.authMiddleware, authMiddleware.adminMiddleware, searchLimiter, searchApiController.search);

// Routes cho DatabaseApiController
router.get('/table', databaseApi.findAllTableNameInDB);
router.get('/table/:tableName/attributes', databaseApi.findAttributesInTable);
router.get('/table/:tableName/attributes-name-only', databaseApi.findAttributesInTableOnlyName);


module.exports = router;
