const Hapi = require('@hapi/hapi');
const axios = require('axios'); // Import Axios

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Autorise toutes les origines
        headers: ['Accept', 'Content-Type', 'Authorization', 'username', 'password'], // Headers autorisés
      },
    },
  });

  // Route de login
  server.route({
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload;

      // Vérifier les identifiants
      if (username === 'Luke' && password === 'DadSucks') {
        return h.response({ authenticated: true }).code(200);
      } else {
        return h.response({ authenticated: false }).code(401);
      }
    },
  });

  // Route de recherche
  server.route({
    method: 'GET',
    path: '/search',
    handler: async (request, h) => {
      const { username, password } = request.headers;
      const { query } = request.query;

      // Vérification des credentials
      if (username !== 'Luke' || password !== 'DadSucks') {
        return h.response({ error: 'Unauthorized' }).code(401);
      }

      // Vérification du paramètre query
      if (!query) {
        return h.response({ error: 'Query parameter is required' }).code(400);
      }

      const categories = ['people', 'planets', 'films', 'starships', 'vehicles', 'species'];

      try {
        console.log(`Recherche pour query: ${query}`);
        const results = await Promise.all(
          categories.map(async (category) => {
            try {
              const response = await axios.get(`https://swapi.dev/api/${category}/?search=${query}`);
              console.log(`Résultats pour ${category}:`, response.data.results);
              return { category, results: response.data.results };
            } catch (error) {
              console.error(`Erreur pour la catégorie ${category}:`, error.message);
              return { category, results: [] };
            }
          })
        );

        // Transforme les résultats en un objet clé-valeur
        const formattedResults = results.reduce((acc, { category, results }) => {
          acc[category] = results || [];
          return acc;
        }, {});

        return { query, results: formattedResults };
      } catch (err) {
        console.error('Erreur dans la route /search:', err.message);
        return h.response({ error: 'Failed to fetch data from SWAPI' }).code(500);
      }
    },
  });

  await server.start();
  console.log(`Hapi server running on ${server.info.uri}`);
};

init();
