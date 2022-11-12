"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Category_1 = require("./entity/Category");
var Porduct_1 = require("./entity/Porduct");
var User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "list-com",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Porduct_1.Product, Category_1.Category],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map