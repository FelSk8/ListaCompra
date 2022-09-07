import * as express from "express"
import { AppDataSource } from "./data-source"
import * as cors from "cors"
import routes from "./routes";

const PORT = process.env.PORT || 3000; // PUERTO LOCAL
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/',routes)
    app.listen(PORT, () => {console.log(`server is running on port: ${PORT}`)});

  

}).catch(error => console.log(error))
