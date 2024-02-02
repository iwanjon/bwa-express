require('dotenv').config();

import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { DataSource, DataSourceOptions, PrimaryGeneratedColumn } from 'typeorm';
import "reflect-metadata";
import { createDatabase } from "typeorm-extension";
import { routes } from './routes';
import { Entities } from './entities/entity_register';
import { User } from './entities/user';
import morgan  from "morgan";
import logger from './logger';

type xxx = "postgres" | "mysql"


// const AppDataSource = new DataSource({
//     type: process.env.TYPE as xxx,
//     host: process.env.HOST,
//     port: Number(process.env.PORT),
//     username: process.env.USERDB,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     // process.env.SECRET_KEY
//     // entities: [Photo],
//     synchronize: true,
//     logging: false,
// });

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// AppDataSource.initialize()
//     .then(() => {
//         console.log(process.env.USERNAME)
//         console.log(process.env.USERDB)
//         // here you can start to work with your database
//     })
//     .catch((error) => {
//         console.log(error);
//     });
const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => logger.http(message.trim()),
      },
    }
  );
  


let app = express();
const run_process = async () => {
    const options: DataSourceOptions = {
        type: process.env.TYPE as xxx,
        host: process.env.HOST,
        port: Number(process.env.PORT),
        username: process.env.USERDB,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        // process.env.SECRET_KEY
        entities: Entities,
        synchronize: true,
        logging: false,
    };

    // Create the database with specification of the DataSource options
    await createDatabase({
        options
    });

    const dataSource = new DataSource(options);

    await dataSource.initialize();
    await dataSource.synchronize();
    
    app.use(morganMiddleware);
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000"]
    }));

    routes(app);

    return [app, dataSource];
    // app.listen(8000, () => {
    //     console.log('listening to port 8000');
    // });
    // do something with the DataSource
};
// run_process();
run_process()
// let promi = abc[0]
export { run_process, app };

async function startServer(ap:Express){
    // const apps: Express = await ap;
    app.listen(8000, () => {
        console.log("Server started on port 8000");
    });
}


startServer(app);




// app.listen(8000, () => {
//     console.log("Server started on port 8000");
// });


export default app;