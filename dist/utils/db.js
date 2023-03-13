"use strict";
// import pkg from 'pg';
// const { Client } = pkg;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose from 'mongoose';
const mongodb_1 = require("mongodb");
class Db {
    // constructor() {
    //     this.connect()
    // }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('init');
            const client = new mongodb_1.MongoClient('mongodb://clicks:KWERmwgHs0UxWsLl@clickscluster.g21ml.mongodb.net/mathematica-prod?authSource=admin&replicaSet=atlas-5pfvgk-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true');
            this.client = yield client.connect();
            console.log('Connected successfully to server');
        });
    }
    // async endConnection() {
    //     return await this.client.end()
    // }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ query })
            try {
                // console.log({ x: await this.client });
                const [rows, fields] = yield this.client.execute(query.text, query.values);
                // const [rows, fields] = await client.query('SELECT * FROM `categories`', ['Morty', 14]);
                return rows;
            }
            catch (e) {
                this.handleError(e);
                return [];
            }
        });
    }
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('An error occured: ', error.stack);
        });
    }
}
exports.default = Db;
//# sourceMappingURL=db.js.map