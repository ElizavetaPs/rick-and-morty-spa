<template>
    <div class="bg-blue-300 p-5 flex justify-between items-center">
        <div class="flex">
            <input 
                type="text"
                v-model="filteredName"
                placeholder="Имя персонажа"
                class="block w-60 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
            <select 
                v-model="filteredStatus"
                class="block w-60 ml-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                <option value="" selected>Не выбрано</option>
                <option value="alive">alive</option>
                <option value="dead">dead</option>
                <option value="unknown">unknown</option>
            </select>
            <button 
                @click="filterCharacters"
                :disabled="$store.state.isFilteringCharacters"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
            >
                Поиск
            </button>
            <button 
                @click="resetFilters"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3"
                v-if="filteredName || filteredStatus"
            >
                Сброс фильтров
            </button>
            <div class="ml-3" v-if="$store.state.isFilteringCharacters">
                <Loader />
            </div>
        </div>
    </div>
    <div class="p-5 flex flex-wrap">
        <div class="w-1/3" v-for="character in allCharacters" :key="character.id">
            <CharacterCard 
                :id="character.id"
                :name="character.name"
                :url="character.url"
                :imageLink="character.image"
                :species="character.species"
                :episodes="character.episode"
            />
        </div>
    </div>
    <div class="flex justify-center pt-10 pb-10">
        <div v-if="!$store.state.isLoadingCharacters">
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="loadNextCharacters"
                v-if="hasNextPage"
            >
                Загрузить еще
            </button>
        </div>
        <div v-else>
            <Loader />
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    import Loader from '../components/Loader.vue';
    import CharacterCard from '../components/CharacterCard.vue';

    export default {
        name: 'Main',
        data() {
            return {
                filteredName: '',
                filteredStatus: '',
            }
        },
        components: {
            CharacterCard,
            Loader
        },
        computed: {
            ...mapGetters([ 'allCharacters']),
            
            hasNextPage() {
                const { page, totalPages } = this.$store.state;
                return page < totalPages;
            }
        },
        methods: {
            ...mapActions(['getCharacters', 'loadNextCharacters', 'getFilteredCharacters']),
            ...mapMutations(['addFilterParam', 'clearFilters']),

            filterCharacters() {
                if (!this.filteredName && !this.filteredStatus) {
                    this.$router.replace({
                        query: {}
                    });
                    this.clearFilters();
                    this.getCharacters();
                } else {
                    this.$router.replace({
                        query: {
                            name: this.filteredName ? this.filteredName : null,
                            status: this.filteredStatus ? this.filteredStatus : null
                        }
                    });
                    this.$store.commit('addFilterParam', {
                        name: this.filteredName,
                        status: this.filteredStatus
                    });
                    this.getFilteredCharacters();
                }
            },
            resetFilters() {
                this.filteredName = '';
                this.filteredStatus = '';
                this.$router.replace({
                    query: {}
                });
                this.clearFilters();
                this.getCharacters();
            }
        },
        async mounted() {
            await this.getCharacters();
        }
    }
</script>