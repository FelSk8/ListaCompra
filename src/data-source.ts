import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Product } from "./entity/Porduct"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "list-com",
    synchronize: true,
    logging: false,
    entities: [User, Product, Category],
    migrations: [],
    subscribers: [],
})
