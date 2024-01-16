const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries')

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/movies', db.getMovies)
app.get('/movies/:id', db.getMovieById)
app.post('/movies', db.createMovie)
app.put('/movies/:id', db.updateMovie)
app.delete('/movies/:id', db.deleteMovie)


app.listen(port, () => {
    console.log(`http://localhost:${port}/movies`)
})