import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';
import { handleListAll, handleSearch } from './searchCountry.js';
import path from "path";


const PORT = 9000;

const app = express();
app.get('/countries', handleListAll);
app.get('/country', handleSearch);


const file = path.join(process.cwd(), '../server', 'schema.graphql');
const typeDefs = await readFile(file, 'utf8');


const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use(express.json({ limit: "50mb"}))
app.use('/graphql', apolloMiddleware(apolloServer));

app.listen({ port: PORT}, () => {
    console.log(`Server running on port ${ PORT }`);
    console.log(`GrapQL endpont: http://localhost:${PORT}/graphql`);
})
