import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';
import { handleListAll, handleSearchByIsoCode } from './searchCountry.js';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 9000;

const app = express();
app.get('/countries', handleListAll);
app.get('/country', handleSearchByIsoCode);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = __dirname + "/";
const resolvedPath = path.resolve(baseDir + 'schema.graphql');
console.log("resolvedPath: " + resolvedPath);
const typeDefs = await readFile(resolvedPath, 'utf8');


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
app.use(express.json({ limit: "50mb"}))
app.use('/', apolloMiddleware(apolloServer));

app.listen({ port: PORT}, () => {
    console.log(`Server running on port ${ PORT }`);
    console.log(`GrapQL endpont: http://localhost:${PORT}`);
})
