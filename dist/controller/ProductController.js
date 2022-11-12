"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductContoller = void 0;
var typeorm_1 = require("typeorm");
var data_source_1 = require("../data-source");
var Category_1 = require("../entity/Category");
var Porduct_1 = require("../entity/Porduct");
var ProductContoller = /** @class */ (function () {
    function ProductContoller() {
    }
    var _a;
    _a = ProductContoller;
    ProductContoller.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, name, price, categories, product, categoryRepo, productRepository, contegoryId, error_1, e_1;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, name = _b.name, price = _b.price, categories = _b.categories;
                    product = new Porduct_1.Product();
                    product.name = name;
                    product.price = price;
                    categoryRepo = data_source_1.AppDataSource.getRepository(Category_1.Category);
                    productRepository = data_source_1.AppDataSource.getRepository(Porduct_1.Product);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoryRepo.findBy({ id: (0, typeorm_1.In)(categories) })];
                case 2:
                    contegoryId = _c.sent();
                    console.log(contegoryId.length);
                    if (contegoryId.length == 0) {
                        return [2 /*return*/, res.status(409).json({ message: "Category not found" })];
                    }
                    product.name = name;
                    product.price = price;
                    product.categories = contegoryId;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    return [3 /*break*/, 4];
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, productRepository.save(product)];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: "Product already exist" })];
                case 7:
                    res.send("Product created");
                    return [2 /*return*/];
            }
        });
    }); };
    ProductContoller.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var productRepository, products, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    productRepository = data_source_1.AppDataSource.getRepository(Porduct_1.Product);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productRepository.find(//{relations:["categories"]});
                        { relations: ["categories"] } //,where:{id:In([1,2,3])}
                        )];
                case 2:
                    products = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: "Product not found" })];
                case 4:
                    if (products.length > 0) {
                        return [2 /*return*/, res.send(products)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: "Not result" })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    ProductContoller.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, productRepository, product, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    productRepository = data_source_1.AppDataSource.getRepository(Porduct_1.Product);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productRepository.createQueryBuilder("product")
                            .leftJoinAndSelect("product.categories", "categories")
                            .where("product.id=:id", { id: id })
                            .getOne()];
                case 2:
                    product = _b.sent();
                    if (product == null) {
                        return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: "Product not found" })];
                case 4: return [2 /*return*/, res.status(200).json(product)];
            }
        });
    }); };
    ProductContoller.update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _b, name, price, categories, productRepository, categoryRepo, product, error_3, contegoryId, error_4, e_3;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = req.body, name = _b.name, price = _b.price, categories = _b.categories;
                    productRepository = data_source_1.AppDataSource.getRepository(Porduct_1.Product);
                    categoryRepo = data_source_1.AppDataSource.getRepository(Category_1.Category);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productRepository.createQueryBuilder("product")
                            .leftJoinAndSelect("product.categories", "categories")
                            .where("product.id=:id", { id: id })
                            .getOne()];
                case 2:
                    product = _c.sent();
                    if (product == null) {
                        return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: "Product not found" })];
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, categoryRepo.findBy({ id: (0, typeorm_1.In)(categories) })];
                case 5:
                    contegoryId = _c.sent();
                    console.log(contegoryId.length);
                    if (contegoryId.length == 0) {
                        return [2 /*return*/, res.status(409).json({ message: "Category not found" })];
                    }
                    product.name = name;
                    product.price = price;
                    product.categories = contegoryId;
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: "Product not found" })];
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, productRepository.save(product)];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 9:
                    e_3 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: "Product already exist" })];
                case 10:
                    res.send("Product updated");
                    return [2 /*return*/];
            }
        });
    }); };
    ProductContoller.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, productRepository, product, error_5, e_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    productRepository = data_source_1.AppDataSource.getRepository(Porduct_1.Product);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productRepository.createQueryBuilder("product")
                            .leftJoinAndSelect("product.categories", "categories")
                            .where("product.id=:id", { id: id })
                            .getOne()];
                case 2:
                    product = _b.sent();
                    if (product == null) {
                        return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: "Product not found" })];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, productRepository.remove(product)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: "product not found" })];
                case 7:
                    res.status(200).json({ message: "Product deleted" });
                    return [2 /*return*/];
            }
        });
    }); };
    return ProductContoller;
}());
exports.ProductContoller = ProductContoller;
exports.default = ProductContoller;
//# sourceMappingURL=ProductController.js.map