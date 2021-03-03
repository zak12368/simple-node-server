const status = require('http-status')
const Pool = require('pg').Pool
const pool = new Pool({
  //BD host par Heroku
  //Max 20 connections, 10 000 rows
  host: 'ec2-3-221-49-44.compute-1.amazonaws.com',
  database: "dfqdc5eh5tnqp",
  user: 'ucwvuojbdwhurn',
  password: 'a3783d051846cad2b94e755727ed73c9921696f6ece0d22c9960e19b9889664f',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

const getDrawings = (request, response) => {
  pool
    .query('SELECT * FROM public.word_drawing_pair ORDER BY pair_id ASC ')
    .then((results) => {
        response.status(status.OK).json(results.rows)
    })
    .catch((error) => {
        response.status(status.NOT_FOUND).send('Error getting drawings')
    }) 
}

const insertDrawing = (request, response) => {
  const word = request.body.word
  const drawing = request.body.drawing
  pool
    .query('INSERT INTO word_drawing_pair (word, drawing) VALUES ($1, $2)', [word, drawing])
    .then((results) => {
        response.status(status.OK).json(results.rows)
    })
    .catch((error) => {
        response.status(status.NOT_FOUND).send('Error inserting word-drawing pair')
    }) 
}

module.exports = {
    getDrawings,
    insertDrawing
}