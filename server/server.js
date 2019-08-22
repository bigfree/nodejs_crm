import express from "express";
import cors from "cors";

// import { mongoose } from "../db/mongoose";
import { server } from "../config/apollo";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { schema } from "../gql";
import "../config/env";

import { v4 } from "uuid";

// import { ApolloServer } from "apollo-server-express";
// import { schema } from "../gql";

const app = express();

app.use(cors());
server.applyMiddleware({ app });

const ws = createServer(app);
server.installSubscriptionHandlers(app);

ws.listen(process.env.PORT, () => {
    console.log(`🚀 Server on port: ${process.env.PORT}`);
    console.log(`🚀 Mongo on port: ${process.env.DBPORT}`);

    new SubscriptionServer({
        execute,
        subscribe,
        schema,
        onOperation: async (message, params) => {
            params.context.randomId = v4();

            return params;
        },
    }, {
        server: ws,
        path: '/graphql',
    });
});

// const server = new ApolloServer({
//     schema,
//     playground: {
//         endpoint: "/graphql"
//     },
// });

// app.listen({ port: 8000 }, () => {
//     console.log(`🚀 Server ready at http://localhost:${8000}/graphql`);
//     console.log(`Try your health check at: http://localhost:${8000}.well-known/apollo/server-health`);
// });