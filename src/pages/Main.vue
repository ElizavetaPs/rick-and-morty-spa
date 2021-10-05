<template>
    <div class="bg-blue-300 p-5 flex justify-between items-center">
        <div class="flex">
            <div class="flex">
                <input 
                type="text" 
                placeholder="Имя персонажа"
                class="block w-60 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">
                    Поиск
                </button>
            </div>
            <select class="block w-60 ml-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Other</option>
            </select>
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
    import { mapGetters, mapActions } from 'vuex';
    import Loader from '../components/Loader.vue';
    import CharacterCard from '../components/CharacterCard.vue';

    export default {
        name: 'Main',
        components: {
            CharacterCard,
            Loader
        },
        computed: {
            ...mapGetters([
            'allCharacters'
            ]),
            hasNextPage() {
            const { currentPage, totalPages } = this.$store.state;
            return currentPage < totalPages;
            }
        },
        methods: mapActions(['getCharacters', 'loadNextCharacters']),
        async mounted() {
            await this.getCharacters();
        }
    }
</script>