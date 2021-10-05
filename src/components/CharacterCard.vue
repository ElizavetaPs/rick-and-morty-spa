<template>
    <div class="max-w-sm rounded shadow-lg flex w-1/3 m-5">
        <img class="w-80 h-auto" :src="imageLink" alt="Sunset in the mountains">
        <div class="px-6 py-4">
            <router-link 
                :to="{ name: 'character', params: {id} }"
                class="cursor-pointer font-bold hover:underline text-blue-500 text-xl mb-2"
            >
                {{name}}
            </router-link>
            <div>
                <p class="text-gray-700 text-base font-bold">Разновидность:</p>
                <p class="text-gray-700 text-base">{{species}}</p>
            </div>
            <div>
                <p class="text-gray-700 text-base font-bold">Список эпизодов:</p>
                <ul 
                    v-for="(episode, i) in filteredEpisodes"
                    :key="i"
                    class="inline-block"
                >
                    <li class="mr-2">
                        <router-link 
                            :to="{ name: 'episode', params: {id: getIdParam(episode)} }" 
                            class="no-underline hover:underline text-blue-500 font-bold" 
                        >
                            {{getIdParam(episode)}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CharacterCard',
        data() {
            return {
                episodesList: this.episodes,
            }
        },
        props: ['id', 'name', 'url', 'imageLink', 'species', 'episodes'],
        methods: {
            getIdParam(url) {
                return url.match(/\d+$/).toString();
            }
        },
        computed: {
            filteredEpisodes() {
                return this.episodesList.filter((episode, i) => i < 5);
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>