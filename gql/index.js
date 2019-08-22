import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

const resolversArr = fileLoader(path.join(__dirname, "./resolvers/"), {
    recursive: true,
    extensions: [".js"]
});

const typesArr = fileLoader(path.join(__dirname, "./types/"), {
    recursive: true,
    extensions: [".gql"]
});

const resolvers = mergeResolvers(resolversArr);
const typeDefs = mergeTypes(typesArr, {
    all: true
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});

export { schema };