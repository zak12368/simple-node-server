import { NextFunction, Request, Response, Router } from 'express';
//import * as Httpstatus from 'http-status-codes';
import { injectable } from 'inversify';
//import { DatabaseService } from '../services/database.service';
//import Types from './../types';
@injectable()
export class DatabaseController {
    router: Router;

    constructor() {
        this.configureRouter();
    }
    private configureRouter(): void {
        this.router = Router();

        this.router.get('/drawings', async (req: Request, res: Response, next: NextFunction) => {
            res.send("hello");
        });

    }
}
