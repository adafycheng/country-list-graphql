import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';
import { handleListAll, handleSearch } from './searchCountry.js';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 9001;

const app = express();
app.get('/countries', handleListAll);
app.get('/country', handleSearch);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = __dirname + "/";
const resolvedPath = path.resolve(baseDir + 'schema.graphql');
const typeDefs = await readFile(resolvedPath, 'utf8');


const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use(express.json({ limit: "50mb"}))
app.use('/', apolloMiddleware(apolloServer));

app.listen({ port: PORT}, () => {
    console.log(`Server running on port ${ PORT }`);
    console.log(`GrapQL endpont: http://localhost:${PORT}`);
})
