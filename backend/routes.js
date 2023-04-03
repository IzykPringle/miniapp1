import express from 'express';
import knexfile from './knexfile.js';
import cors from 'cors';
import knex from 'knex';
const routePath = express.Router();
routePath.use(cors());

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];
const db = knex(config);


routePath.get('/', (req, res) => {
    db
    .select('*')
    .from('movies')
    .then(movies => {
        let titles = movies.map(movie => movie.title)
        res.json(titles)
    })
})

export default routePath;