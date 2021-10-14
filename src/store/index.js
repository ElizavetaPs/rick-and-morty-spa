import { createStore } from 'vuex';
import axios from 'axios';
import character from './modules/character.js';
import episode from './modules/episode.js';

export default createStore({
    state: {
        characters: [],
        totalPages: 0,
        page: 1,
        filterParams: {
            name: '',
            status: ''
        },
        isLoadingCharacters: false,
        isFilteringCharacters: false
    },
    getters: {
        allCharacters(state) {
            return state.characters;
        }
    },
    mutations: {
        updateCharacters(state, characters) {
            state.characters = [];
            characters.forEach(char => {
                state.characters.push(char);
            });
        },
        addCharacters(state, characters) {
            characters.forEach(char => {
                state.characters.push(char);
            });
        },
        updadeTotalPages(state, pages) {
            state.totalPages = pages;
        },
        resetCurrentPage(state) {
            state.page = 1;
        },
        incrementPage(state) {
            state.page = state.page + 1;
        },
        setProcessLoadingCharacters(state, value) {
            state.isLoadingCharacters = value;
        },
        setProcessFilteringCharacters(state, value) {
            state.isFilteringCharacters = value;
        },
        addFilterParam(state, payload) {
            state.filterParams = payload;
        },
        clearFilters(state) {
            state.filterParams = [];
        }
    },
    actions: {
        async getCharacters({ commit }) {
            await axios.get('https://rickandmortyapi.com/api/character').then(({ data }) => {
                commit('updateCharacters', data.results);
                commit('updadeTotalPages', data.info.pages);
            }).catch(() => {
                commit('updateCharacters', []);
            });
        },
        loadNextCharacters({ commit, state }) {
            commit('incrementPage');
            const params = Object.assign({}, {page: state.page}, state.filterParams);
            commit('setProcessLoadingCharacters', true);
            axios.get('https://rickandmortyapi.com/api/character/', {params}).then(({ data }) => {
                commit('addCharacters', data.results);
                commit('updadeTotalPages', data.info.pages);
                commit('setProcessLoadingCharacters', false);
            });
        },
        async getFilteredCharacters({ commit, state }) {
            commit('setProcessFilteringCharacters', true);
            await axios.get('https://rickandmortyapi.com/api/character/', {
                params: state.filterParams
            }).then(({ data }) => {
                commit('resetCurrentPage');
                commit('updadeTotalPages', data.info.pages);
                commit('updateCharacters', data.results);
                commit('setProcessFilteringCharacters', false);
            }).catch(() => {
                commit('updateCharacters', []);
                commit('updadeTotalPages', 0);
                commit('setProcessFilteringCharacters', false);
            });
        }
    },
    modules: {
        character,
        episode
    }
});