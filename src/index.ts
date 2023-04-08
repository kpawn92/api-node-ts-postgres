import 'reflect-metadata';
import http from 'http';
import app from './app';
import { getNumberEnv } from './config/env';
import { Configuration } from './types/env.keys';
import { DbConnection } from './config/db.connect';

const server = http.createServer(app);
const PORT: number = getNumberEnv(Configuration.PORT);

const Main = () => {
    try {
        server.listen(PORT);
        console.log('Server listened on port: ' + PORT);

        DbConnection();
        console.log('Db connection established');
    } catch (e) {
        console.log(e);
    }
};

Main();
