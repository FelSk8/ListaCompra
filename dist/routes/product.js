"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductController_1 = require("../controller/ProductController");
var router = (0, express_1.Router)();
router.post('/', ProductController_1.default.new);
router.get('/', ProductController_1.default.getAll);
router.get('/:id', ProductController_1.default.getById);
router.patch('/:id', ProductController_1.default.update);
router.delete('/:id', ProductController_1.default.delete);
exports.default = router;
//# sourceMappingURL=product.js.map