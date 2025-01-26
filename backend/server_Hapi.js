const Hapi = require('@hapi/hapi');
const axios = require('axios'); 

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], 
        headers: ['Accept', 'Content-Type', 'Authorization', 'username', 'password'], 
      },
    },
  });


  server.route({
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload;

      if (username === 'Luke' && password === 'DadSucks') {
        return h.response({ authenticated: true }).code(200);
      } else {
        return h.response({ authenticated: false }).code(401);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/search',
    handler: async (request, h) => {
      const { username, password } = request.headers;
      const { query } = request.query;

      if (username !== 'Luke' || password !== 'DadSucks') {
        return h.response({ error: 'Unauthorized' }).code(401);
      }

      if (!query) {
        return h.response({ error: 'Query parameter is required' }).code(400);
      }

      const categories = ['people', 'planets', 'films', 'starships', 'vehicles', 'species'];

      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            try {
              const response = await axios.get(`https://swapi.dev/api/${category}/?search=${query}`);
              return { category, results: response.data.results };
            } catch (error) {
              console.error(`Erreur pour la catégorie ${category}:`, error.message);
              return { category, results: [] };
            }
          })
        );

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
