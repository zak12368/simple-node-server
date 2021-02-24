"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const inversify_1 = require("inversify");
const logger = require("morgan");
const database_controller_1 = require("./controllers/database.controller");
const types_1 = require("./types");
let Application = class Application {
    constructor(databaseController) {
        this.databaseController = databaseController;
        this.internalError = 500;
        this.app = express();
        this.config();
        this.app.get("/", (req, res) => {
            res.send("Hello world!");
        });
        this.bindRoutes();
    }
    config() {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }
    bindRoutes() {
        this.app.use('/database', this.databaseController.router);
        this.errorHandling();
    }
    errorHandling() {
        this.app.use((req, res, next) => {
            const err = new Error('Not Found');
            next(err);
        });
        if (this.app.get('env') === 'development') {
            // tslint:disable-next-line:no-any
            this.app.use((err, req, res, next) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }
        // tslint:disable-next-line:no-any
        this.app.use((err, req, res, next) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
};
Application = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.DatabaseController)),
    __metadata("design:paramtypes", [database_controller_1.DatabaseController])
], Application);
exports.Application = Application;
//# sourceMappingURL=app.js.map