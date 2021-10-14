<template>
    <div v-if="!$store.state.isLoadingCharacter">
        <div class="rounded border-2 border-gray-200 flex m-5">
            <img class="w-80" :src="character.image" :alt="character.name">
            <div class="px-6 py-4">
                <div class="font-bold text-4xl mb-2">
                    {{ character.name }}
                </div>
                <div>
                    <p class="text-gray-700 text-base font-bold text-xl">Разновидность:</p>
                    <p class="text-gray-700 text-base">{{ character.species }}</p>
                </div>
                <div>
                    <p class="text-gray-700 text-base font-bold text-xl">Локация:</p>
                    <p class="text-gray-700 text-base">{{ character.location }}</p>
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
    name: 'Character',
    data() {
        return {
        }
    },
     components: {
        Loader
    },
    computed: {
        ...mapGetters([
        'character'
        ])
    },
    methods: mapActions(['getCharacter']),
    async mounted() {
        await this.getCharacter('hi');
    }
}
</script>