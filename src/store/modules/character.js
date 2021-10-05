import axios from 'axios';
import router from '../../router';

export default {
    state: {
        character: {},
        isLoadingCharacter: false
    },
    getters: {
        character(state) {
            return state.character;
        }
    },
    mutations: {
        updateCharacter(state, character) {
            state.character = character;
        },
        setProcessLoadingCharacter(state, value) {
            state.isLoadingCharacter = value;
        }
    },
    actions: {
        async getCharacter(ctx) {
            const characterId = router.currentRoute._value.params.id;
            ctx.commit('setProcessLoadingCharacter', true);
            await axios.get('https://rickandmortyapi.com/api/character/' + characterId).then(({ data }) => {
                ctx.commit('updateCharacter', data);
                ctx.commit('setProcessLoadingCharacter', false);
            });
        }
    },
    modules: {}
};