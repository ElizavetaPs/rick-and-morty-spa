<template>
    <div v-if="!$store.state.isLoadingEpisode">
        <div class="rounded border-2 border-gray-200 flex m-5">
            <div class="px-6 py-4">
                <div class="font-bold text-4xl mb-2">
                    {{episode.id}}
                    {{episode.name}}
                </div>
                <div class="flex items-center">
                    <p class="text-gray-700 text-base font-bold text-xl">Дата премьеры:</p>
                    <p class="text-gray-700 text-base text-lg ml-3 mt-1">{{ episode['air_date'] }}</p>
                </div>
                <div>
                    <p class="text-gray-700 text-base font-bold text-xl">Персонажи:</p>
                    <div v-for="(id, i) in avatarsId" :key="i" class="inline-block">
                        <router-link 
                            :to="{ name: 'character', params: {id} }"
                            class="cursor-pointer"
                        >
                            <img 
                                class="w-20 h-20 mr-1" 
                                :src="`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`"
                                alt=""
                            >
                        </router-link>
                    </div>
                    <p class="text-gray-700 text-base text-lg mt-1">{{ character }}</p>
                </div>
            </div>
        </div>
        <div class="flex m-5">
            <router-link 
                :to="'/'"
                class="bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Назад
            </router-link>
        </div>
    </div>
    <div v-else>
        <Loader />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from '../components/Loader.vue';

export default {
    name: 'Episode',
     components: {
        Loader
    },
    computed: {
        ...mapGetters([
        'episode',
        'avatarsId'
        ])
    },
    methods: mapActions(['getEpisode']),
    async mounted() {
        await this.getEpisode();
    }
}
</script>