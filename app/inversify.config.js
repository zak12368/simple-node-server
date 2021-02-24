"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const app_1 = require("./app");
const database_controller_1 = require("./controllers/database.controller");
const server_1 = require("./server");
const database_service_1 = require("./services/database.service");
const types_1 = require("./types");
exports.containerBootstrapper = () => __awaiter(this, void 0, void 0, function* () {
    const container = new inversify_1.Container();
    container.bind(types_1.default.Server).to(server_1.Server);
    container.bind(types_1.default.Application).to(app_1.Application);
    container.bind(types_1.default.DatabaseController).to(database_controller_1.DatabaseController);
    container.bind(types_1.default.DatabaseService).to(database_service_1.DatabaseService);
    return container;
});
//# sourceMappingURL=inversify.config.js.map