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
            res.json(movies)
        })
})

routePath.post('/', async (req, res) => {
    let movie = req.body;
    await db
        .insert(movie)
        .into('movies')
        .then(function (result) {
            res.json({ success: true, message: 'movie added' });
        })
        .catch(err =>
            res.json({
                message:
                    'The data you are looking for could not be found. Please try again.'
            })
        );
})

routePath.delete('/', (req, res) => {
    db('movies')
        .where('title', req.body.title)
        .del()
        .then(function (result) {
            res.json({ success: true, message: 'movie deleted' });
        })
        .catch(err =>
            res.json({
                message:
                    'Could not delete this item.'
            })
        );
})


export default routePath;