export default {
    Query: {
        // Vypisanie jednej ulohy
        task: async (root, { id }, { models: { task }}) => {
            return await task.findById(id).populate("client");
        },

        // Vypisanie vsetkych uloh
        tasks: async (root, _, { models: { task }}) => {
            return await task.find({}).sort({ created_at: -1 }).populate("client");
        },
    },
    Mutation: {

        /**
         * Pridanie ulohy
         * 
         * @param {object} input - Vstupne data
         * @return {object<Response>}
         */
        addTask: async (root, { input }, { models: { task }}) => {
            try {
                let res = await task.create(input);
                return { ok: true, message: "Úloha bola vytvorená", task: res }
            }
            catch (error) {
                return { ok: false, message: error.message }
            }
        },

        /**
         * Aktualizovanie úlohy
         * 
         * @param {string} id - ID ulohy
         * @param {object} input - Vstupne data
         * 
         * @return {object<Response>}
         */
        updateTask: async (root, { id, input }, { models: { task }}) => {

            let query = { _id: id };
            let update = { $set: input };
            let props = {
                new: true,
                runValidators: true,
                context: "query"
            };

            try {
                let res = await task.findOneAndUpdate(query, update, props);
                return { ok: true, message: "Úloha bola aktualizovaná", task: res };
            }
            catch (error) {
                return { ok: false, message: error.message };
            }
        },

        /**
         * Vymazanie ulohy
         * 
         * @param {string} id - ID Ulohy
         * @return {object<Response>}
         */
        deleteTask: async (root, { id }, { models: { task }}) => {
            try {
                let res = await task.findOneAndRemove({ _id: id });
                return { ok: true, message: "Úloha bola vymazaná", task: res };
            }
            catch (error) {
                return { ok: false, message: error.message };
            }
        }
    }
}