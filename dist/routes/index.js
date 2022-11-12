"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("./user");
var auth_1 = require("./auth");
var category_1 = require("./category");
var product_1 = require("./product");
var routes = (0, express_1.Router)();
routes.use('/user', user_1.default);
routes.use('/auth', auth_1.default); //rutas de autenticacion
routes.use('/category', category_1.default);
routes.use('/product', product_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map