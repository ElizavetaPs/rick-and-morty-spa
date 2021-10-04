import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        characters: [],
        totalPages: 0,
        currentPage: 1,
        isLoadingCharacters: false
    },
    getters: {
        allCharacters(state) {
            return state.characters
        }
    },
    mutations: {
        updateCharacters(state, characters) {
            characters.forEach(char => {
                state.characters.push(char);
            });
        },
        updadeTotalPages(state, pages) {
            state.totalPages = pages;
        },
        incrementPage(state) {
            state.currentPage = state.currentPage + 1;
        },
        setProcessLoadingCharacters(state, value) {
            state.isLoadingCharacters = value;
        }
    },
    actions: {
        async getCharacters(ctx) {
            await axios.get('https://rickandmortyapi.com/api/character').then(({ data }) => {
                ctx.commit('updateCharacters', data.results);
                ctx.commit('updadeTotalPages', data.info.pages);
            });
        },
        loadNextCharacters(ctx) {
            const url = 'https://rickandmortyapi.com/api/character/?page=' + ctx.state.currentPage;
            ctx.commit('incrementPage');
            ctx.commit('setProcessLoadingCharacters', true);
            axios.get(url).then(({ data }) => {
                ctx.commit('updateCharacters', data.results);
                ctx.commit('setProcessLoadingCharacters', false);
            });
        },
    },
    modules: {}
});