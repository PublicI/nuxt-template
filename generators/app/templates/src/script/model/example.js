
export default {
    state: {
        list: []
    },
    mutations: {
        setExample(state, example) {
            state.list = example;
        }
    },
    getters: {
        example(state) {
            return state.example.list;
        }
    }
};
