// Nouveau server avec Hapi

const Hapi = require('@hapi/hapi');
const axios = require('axios');

const VALID_USER = 'Luke';
const VALID_PASS = 'DadSucks';

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload;
      if (username === VALID_USER && password === VALID_PASS) {
        return { authenticated: true };
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
      if (username !== VALID_USER || password !== VALID_PASS) {
        return h.response({ error: 'Unauthorized' }).code(401);
      }

      const { query } = request.query;
      if (!query) {
        return h.response({ error: 'Query parameter is required' }).code(400);
      }

      try {
        const categories = [
          'people',
          'planets',
          'starships',
          'vehicles',
          'species',
          'films',
        ];
        const results = await Promise.all(
          categories.map(async (category) => {
            const response = await axios.get(`https://swapi.dev/api/${category}/?search=${query}`);
            return { category, results: response.data.results };
          })
        );
        return { query, results };
      } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to fetch data from SWAPI' }).code(500);
      }
    },
  });

  await server.start();
  console.log('HAPI Server running on %s', server.info.uri);
};

init();
