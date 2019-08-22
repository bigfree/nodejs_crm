import { pubsub } from "../../config/apollo";

const CLIENT_ADDED = "CLIENT_ADDED";

export default {
    Subscription: {
        clientAdded: {
            subscribe: () => pubsub.asyncIterator([CLIENT_ADDED]),
        }
    },
    Query: {
        // Vypisanie jedneho klienta
        client: async (root, { id }, { models: { client }}) => await client.findById(id),

        // Vypisanie vsetkych klientov
        // clients: async () => await Client.find({}).sort({ created_at: -1 }).exec(),
        clients: async (root, {}, { models: { client }}) => await client.find({}).sort({ created_at: -1 }),
    },
    Mutation: {

        /**
         * Pridanie noveho klienta
         * 
         * @param {object} input - vstupne data klienta
         * 
         * @return {object<Response>} vrati noveho klienta
         */
        addClient: async (root, { input }, { models: { client }}) => {
            try {
                let res = await client.create(input);

                pubsub.publish(CLIENT_ADDED, { clientAdded: res});
                return { ok: true, message: "Klient bol vytvorený", client: res };
            }
            catch (error) {
                return { ok: false, message: error.message };
            }
        },

        /**
         * Update klienta
         * 
         * @param {string} id - id klienta
         * @param {object} input - vstupne data klienta
         * 
         * @return {object<Response>} vrati update klienta
         */
        updateClient: async (root, { id, input }, { models: { client }}) => {

            // const { name, description } = input;

            let query = { _id: id };
            let update = { $set: input };

            let props = {
                new: true,
                runValidators: true,
                context: "query"
            };
            
            try {
                let res = await client.findOneAndUpdate(query, update, props);
                return { ok: true, message: "Klient bol úspešne upravený", client: res };
            }
            catch (error) {
                return { ok: false, message: error.message };
            }
        },

        /**
         * Vymazanie klienta
         * 
         * @param {string} id - ID klienta
         * 
         * @return {object<Response>}
         */
        deleteClient: async (root, { id }, { models: { client }}) => {
            try {
                let res = await client.findOneAndRemove({ _id: id });
                return { ok: true, message: "Klient bol úspešné zmazaný", client: res };
            }
            catch (error) {
                return { ok: false, message: error.message };
            }
        },
    },
};