import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { resolvers } from './resolvers.js';
import { handleListAll, handleSearchByIsoCode } from './searchCountry.js';
import { readFile } from 'node:fs/promises';

// Constants
const PORT = 9000;
const SCHEMA_FILE = './schema.graphql';

// Apollo Server Middleware
const typeDefs = await readFile(SCHEMA_FILE, 'utf8');

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                footer: false,
            })
            : ApolloServerPluginLandingPageLocalDefault(),
    ],});
await apolloServer.start();

// Express Server
const app = express();
app.get('/countries', handleListAll);
app.get('/country', handleSearchByIsoCode);

app.use(express.json({ limit: "50mb"}))
app.use('/', apolloMiddleware(apolloServer));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://aws-api-specs.adafycheng.dev/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen({ port: PORT}, () => {
    console.log(`Server running on port ${ PORT }`);
    console.log(`GrapQL endpont: http://localhost:${PORT}`);
})
