import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { resolvers } from './resolvers.js';
import { handleListAll, handleSearchByIsoCode } from './searchCountry.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises';
import cors from 'cors';


// Constants
const PORT = 9000;
const SCHEMA_FILENAME = 'schema.graphql';

// Read Schema File
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = __dirname + "/";
const resolvedPath = path.resolve(baseDir + SCHEMA_FILENAME);
console.log("resolvedPath: " + resolvedPath);
const typeDefs = await readFile(resolvedPath, 'utf8');

// Apollo Server Middleware
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
app.use('/',
    cors({ origin: ['https://aws-api-specs.adafycheng.dev'] }),
    apolloMiddleware(apolloServer));

app.listen({ port: PORT}, () => {
    console.log(`Server running on port ${ PORT }`);
    console.log(`GrapQL endpont: http://localhost:${PORT}`);
})
