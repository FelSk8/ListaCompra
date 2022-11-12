"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CategoryController_1 = require("../controller/CategoryController");
var router = (0, express_1.Router)();
router.post('/', CategoryController_1.CategoryController.new); //creamos una nueva categoria
exports.default = router;
//# sourceMappingURL=category.js.map