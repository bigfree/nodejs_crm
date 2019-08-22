export default {
    Query: {

        user: async (root, { id }, { models: { user }}) => await user.findById(id),

        users: async (root, {}, { models: { user }}) => await user.find({}).sort({ created_at: -1 })
    },
    Mutation: {

        /**
         * Prida noveho uzivatela
         * 
         * @param {object} input - data uzivatela
         * 
         * @return {object<Response>}
         */
        addUser: async (root, { input }, { models: { user }}) => {
            try {
                let res = await user.create(input);
                return { ok: true, message: "Užívateľ bol vytvorený", user: res };
            }
            catch (error) {
                return { ok: false, message: error.message }
            }
        },

        /**
         * Update uzivatela
         * 
         * @param {string} id - id uzivatela
         * @param {object} input - data uzivatela
         * 
         * @return {object<Response>}
         */
        updateUser: async (root, { id, input }, { models: { user }}) => {

            let query = { _id: id };
            let update = { $set: input };
            let props = {
                new: true,
                runValidators: true,
                context: "query"
            };

            try {
                let res = await user.findOneAndUpdate(query, update, props);
                return { ok: true, message: "Užívateľ bol aktualizovaný", user: res };
            }
            catch (error) {
                return { ok: false, message: error.message };
            }
        },

        /**
         * Vymaze uzivatela
         * 
         * @param {string} id - id uzivatela
         * 
         * @return {object<Response>}
         */
        deleteUser: async (root, { id }, { models: { user }}) => {
            try {
                let res = await user.findOneAndRemove({ _id: id });
                return { ok: true, message: "Užívateľ bol zmazaný", user: res };
            }
            catch (error) {
                return { ok: false, message: error.message };
            }
        },
    },
}