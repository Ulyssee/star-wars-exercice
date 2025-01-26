// Ici c'est l'ancien server avant l'utilisation de Hapi

const http = require('http');
const url = require('url');
const https = require('https');

const PORT = 3001;

const fetchFromSWAPI = (category, query) => {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://swapi.dev/api/${category}/?search=${query}`;
        https.get(apiUrl, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data).results || []);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const VALID_USER = 'Luke';
const VALID_PASS = 'DadSucks';

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, username, password');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const queryParam = parsedUrl.query.query; 

    if (req.method === 'POST' && path === '/login') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                const { username, password } = JSON.parse(body);
                if (username === VALID_USER && password === VALID_PASS) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ authenticated: true }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ authenticated: false }));
                }
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Bad request body' }));
            }
        });
        return;
    }

    if (req.method === 'GET' && path === '/search' && queryParam) {
        const { username, password } = req.headers;
        if (username !== VALID_USER || password !== VALID_PASS) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }

        const categories = ['films', 'people', 'planets', 'starships', 'vehicles', 'species'];
        try {
            const results = await Promise.all(
                categories.map((category) => fetchFromSWAPI(category, queryParam))
            );

            const response = categories.reduce((acc, category, index) => {
                acc[category] = results[index];
                return acc;
            }, {});

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ query: queryParam, results: response }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch data from SWAPI' }));
        }
        return;
    }

    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid endpoint or missing query parameter' }));
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
