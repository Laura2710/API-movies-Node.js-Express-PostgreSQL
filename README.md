# Movies API

Ce projet est une API simple pour gérer une collection de films. Elle vous permet de créer, lire, mettre à jour et supprimer des films dans une base de données PostgreSQL.

![image](https://github.com/Laura2710/API-movies-Node.js-Express-PostgreSQL/assets/50915086/0cbdfaa1-6e82-4344-a624-03b98bd125a5)

## Technologies Utilisées

- Node.js
- PostgreSQL
- Express.js
- npm (Node Package Manager)

## Utilisation
L'API expose les endpoints suivants :

- `GET /movies` : Récupère la liste de tous les films.
- `GET /movies/:id` : Récupère les détails d'un film par son ID.
- `POST /movies` : Crée un nouveau film.
- `PUT /movies/:id` : Met à jour les informations d'un film par son ID.
- `DELETE /movies/:id` : Supprime un film par son ID.

### Exemple de corps de requête JSON pour une requête POST et PUT
```json
{
  "movie_name": "Nom du film",
  "movie_date": 2022
}
```

# Le code
## queries.js
Le fichier queries.js contient les fonctions de requête SQL pour les opérations CRUD sur la base de données. C'est ici que vous spécifiez comment interagir avec la base de données.
- getMovies: Cette fonction récupère tous les films de la base de données et renvoie la liste en JSON.
- getMovieById: Cette fonction récupère un film spécifique en fonction de son ID et le renvoie en JSON.
- createMovie: Cette fonction ajoute un nouveau film à la base de données en fonction des données fournies dans la requête POST.
- updateMovie: Cette fonction modifie les détails d'un film existant en fonction de son ID en utilisant les données fournies dans la requête PUT.
- deleteMovie: Cette fonction supprime un film de la base de données en fonction de son ID.

## app.js
Le fichier app.js configure et exécute l'application Express.js. Il définit également les routes API pour interagir avec la base de données.
Lorsque vous recevez une requête HTTP (comme GET, POST, PUT ou DELETE) sur l'une des routes spécifiées (/movies, /movies/:id), Express.js appelle les fonctions correspondantes définies dans queries.js pour traiter la demande et renvoyer la réponse appropriée.
