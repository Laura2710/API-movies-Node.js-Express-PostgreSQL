const { Pool } = require('pg');

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5432',
    port: 5432,
});

/**
 * Récupère la liste des films.
 * @param {Object} request - La requête HTTP entrante.
 * @param {Object} response - La réponse HTTP à renvoyer.
 */
const getMovies = async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM movies ORDER BY id ASC');
        response.status(200).json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des films.' });
    }
};

/**
 * Récupère un film par son ID.
 * @param {Object} request - La requête HTTP entrante.
 * @param {Object} response - La réponse HTTP à renvoyer.
 */
const getMovieById = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        response.status(200).json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération du film par ID :', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la récupération du film.' });
    }
};

/**
 * Crée un nouveau film.
 * @param {Object} request - La requête HTTP entrante.
 * @param {Object} response - La réponse HTTP à renvoyer.
 */
const createMovie = async (request, response) => {
    const { movie_name, movie_date } = request.body;

    if (!movie_name || !movie_date) {
        response.status(400).json({ error: 'Les champs movie_name et movie_date sont requis.' });
        return;
    }

    try {
        const result = await pool.query('INSERT INTO movies (movie_name, movie_date) VALUES ($1, $2) RETURNING id', [movie_name, movie_date]);
        const newMovieId = result.rows[0].id;
        response.status(201).json({ message: `Film créé avec l'ID : ${newMovieId}` });
    } catch (error) {
        console.error('Erreur lors de la création du film :', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la création du film.' });
    }
};

/**
 * Met à jour un film par son ID.
 * @param {Object} request - La requête HTTP entrante.
 * @param {Object} response - La réponse HTTP à renvoyer.
 */
const updateMovie = async (request, response) => {
    const id = parseInt(request.params.id);
    const { movie_name, movie_date } = request.body;

    if (!movie_name || !movie_date) {
        response.status(400).json({ error: 'Les champs movie_name et movie_date sont requis.' });
        return;
    }

    try {
        await pool.query('UPDATE movies SET movie_name = $1, movie_date = $2 WHERE id = $3', [movie_name, movie_date, id]);
        response.status(200).json({ message: `Film modifié avec l'ID : ${id}` });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du film :', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du film.' });
    }
};

/**
 * Supprime un film par son ID.
 * @param {Object} request - La requête HTTP entrante.
 * @param {Object} response - La réponse HTTP à renvoyer.
 */
const deleteMovie = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        await pool.query('DELETE FROM movies WHERE id = $1', [id]);
        response.status(200).json({ message: `Film supprimé avec l'ID : ${id}` });
    } catch (error) {
        console.error('Erreur lors de la suppression du film :', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la suppression du film.' });
    }
};

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
