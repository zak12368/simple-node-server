import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import * as logger from 'morgan';
import { DatabaseController } from './controllers/database.controller';
import Types from './types';

@injectable()
export class Application {
    private readonly internalError: number = 500;
    app: express.Application;

    constructor(@inject(Types.DatabaseController) private databaseController: DatabaseController) {
        this.app = express();
        this.config();
        this.app.get( "/", ( req, res ) => {
            res.send( "Hello world!" );
        } );

        this.bindRoutes();
    }

    private config(): void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    bindRoutes(): void {
        this.app.use('/database', this.databaseController.router);
        this.errorHandling();
    }

    private errorHandling(): void {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error('Not Found');
            next(err);
        });

        if (this.app.get('env') === 'development') {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}