import axios from 'axios';
import router from '../../router';

export default {
    state: {
        episode: {},
        avatarsId: [],
        isLoadingEpisode: false
    },
    getters: {
        episode(state) {
            return state.episode;
        },
        avatarsId(state) {
            return state.avatarsId;
        }
    },
    mutations: {
        updateEpisode(state, episode) {
            state.episode = episode;
        },
        getCaractersAvatarId(state, characters) {
            characters.forEach(character => {
                const avatarExtention = character.match(/\d+$/).toString();
                state.avatarsId.push(avatarExtention);
            });
        },
        setProcessLoadingEpisode(state, value) {
            state.isLoadingEpisode = value;
        }
    },
    actions: {
        async getEpisode(ctx) {
            const episodeId = router.currentRoute._value.params.id;
            ctx.commit('setProcessLoadingEpisode', true);
            await axios.get('https://rickandmortyapi.com/api/episode/' + episodeId).then(({ data }) => {
                ctx.commit('updateEpisode', data);
                ctx.commit('getCaractersAvatarId', data.characters);
                ctx.commit('setProcessLoadingEpisode', false);
            });
        }
    },
    modules: {}
};