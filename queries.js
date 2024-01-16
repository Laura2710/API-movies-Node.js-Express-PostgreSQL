const { escape } = require('querystring');
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5432',
    port: 5432,
})

const getMovies = (request, response) => {
    pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMovieById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM movies WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createMovie = (request, response) => {
    const { movie_name, movie_date } = request.body
    if (movie_name !== '' && movie_date !== '') {
        try {
            pool.query('INSERT INTO movies (movie_name, movie_date) VALUES ($1, $2)', [movie_name, movie_date], (error, results) => {
                if (error) {
                    response.status(400).send(error.message);
                } else {
                    response.status(201).send(`Movie added with ID: ${results.insertId}`);
                }
            });
        } catch (error) {
            response.status(400).send(error.message);
        }

    }
    else {
        response.status(400).send()
    }
}

const updateMovie = (request, response) => {
    const id = parseInt(request.params.id)
    const { movie_name, movie_date } = request.body
    pool.query(
        'UPDATE movies SET movie_name = $1, movie_date = $2 WHERE id = $3',
        [movie_name, movie_date, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Movie modified with ID: ${id}`)
        }
    )
}

const deleteMovie = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Movie deleted with ID: ${id}`)
    })
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
}