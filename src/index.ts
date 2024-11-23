import express, { query } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';


async function runGql() {
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

// Create gql Server
const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
    `,
    resolvers: {
        Query: {
            hello : () => `Hey how are you?`,
            say: (_, {name}: {name:String}) => `Hey ${name} how are you?`
        }
    },
  });

// start gql servr
await gqlServer.start();

app.get('/', (req, res) => {
    res.json({message: 'All is OK'});
})

app.use('/graphql', expressMiddleware(gqlServer));

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`)})
}

runGql();