// import pkg from 'pg';
// const { Client } = pkg;

// import mongoose from 'mongoose';
import { MongoClient } from 'mongodb'


class Db {

    private client: any;

    // constructor() {

    //     this.connect()
    // }

    async connect() {
        console.log('init')
        const client = new MongoClient('mongodb://clicks:KWERmwgHs0UxWsLl@clickscluster.g21ml.mongodb.net/mathematica-prod?authSource=admin&replicaSet=atlas-5pfvgk-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true');

        this.client = await client.connect();
        console.log('Connected successfully to server');
    }

    // async endConnection() {
    //     return await this.client.end()
    // }

    async query(query: queryFormat) {

        // console.log({ query })

        try {
            // console.log({ x: await this.client });
            const [rows, fields] = await this.client.execute(query.text, query.values);


            // const [rows, fields] = await client.query('SELECT * FROM `categories`', ['Morty', 14]);

            return rows;

        } catch (e) {
            this.handleError(e);

            return [];
        }
    }

    async handleError(error: any) {
        console.log('An error occured: ', error.stack);
    }
}


interface queryFormat {
    // name?: string;
    text: string;
    values?: any;
}

export default Db;