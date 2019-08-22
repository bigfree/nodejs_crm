import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime, GraphQLDate } from "graphql-iso-date";
import { GraphQLUpload } from "graphql-upload";

export default {
    JSON: GraphQLJSON,
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
    Upload: GraphQLUpload,
};