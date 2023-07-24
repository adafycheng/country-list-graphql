import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Schema Definition
const typeDefs = `#graphql
    schema {
        query: Query
    }

    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!',
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: {port: 9000} });
console.log(`Server running at ${ url }`);