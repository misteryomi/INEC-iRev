import * as dotenv from 'dotenv';
import express from 'express';
import INECController from './app/Controllers/INECController';
import Db from './utils/db';

dotenv.config()

const port = 8000;
const app = express();

export async function runCode() {

    const db = new Db; // initialise db connection;

    await db.connect();
    // const inecService = new INECController();

    // await inecService.dataFetcher();


}

runCode();


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})