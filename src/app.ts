import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// ---> ROUTES ----------------------------------------
import UserRoutes from './user/routes/user.routes';
import AuthRoutes from './user/routes/auth.routes';
// ----------------------------------------------------

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/v1', [UserRoutes, AuthRoutes]);

export default app;
