import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { schema } from "../gql";

import models from "../models/index";

export const pubsub = new PubSub();

export const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        // if (!req || !req.headers) return;

        return {
            models,
            // user: {
            //     id: req.user
            // },
        };
    },
    // context({ req, connection }) {
    //     return {
    //         models,
    //         user: {
    //             id: req.user,
    //             role: req.role
    //         },
    //     };
    // },
    tracing: false,
    playground: {
        endpoint: "/graphql",
        subscriptionEndpoint: 'ws://localhost:8000/graphql'
    }
});