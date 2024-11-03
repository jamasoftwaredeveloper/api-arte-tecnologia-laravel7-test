import configService from "../../utils/configService";
import CardList from "../CardList/index.vue";

import SearchInput from "../SearchInput/index.vue";
import { ComponentDataStructure } from "./dataStructure";

export default {
    name: "Dashboard",
    components: {
        CardList,
        SearchInput,
    },

    data() {
        return {
            ...ComponentDataStructure,
            currentPage: 1,
            perPage: 20, // Número de elementos por página
            totalRows: 0, // Total de Pokémon disponibles,
            filteredItems: [], // Ítems filtrados,
            searchQuery: "",
            count: 1302,
        };
    },
    created() {
        // Simulación de datos iniciales (puede venir de una API)
        this.filteredItems = this.items; // Muestra todos al inicio
    },
    mounted() {
        this.fetchAllPokemonImages();
        this.getPokemonSearch();
    },
    methods: {
        async getPokemons() {
            try {
                const offset = (this.currentPage - 1) * this.perPage; // Calcula el offset
                let endpoint = `${this.url}?offset=${offset}&limit=${this.perPage}`;
                let response = await configService.get(endpoint);
                this.totalRows = response.count;
                return response.results;
            } catch (error) {
                console.log("error", error);
            } finally {
                this.loading = false;
            }
        },
        async getPokemonSearch() {
            try {
                const offset = (this.currentPage - 1) * this.count; // Calcula el offset
                let endpoint = `${this.url}?offset=${offset}&limit=${this.count}`;
                let response = await configService.get(endpoint);
                this.totalRows = response.count;
                this.filteredItems = response.results;
            } catch (error) {
                console.log("error", error);
            } finally {
                this.loading = false;
            }
        },
        onPageChange(page) {
            this.currentPage = page; // Actualiza la página actual
            this.fetchAllPokemonImages(); // Vuelve a cargar los Pokémon de la nueva página
        },
        async fetchPokemonImage(url) {
            try {
                const data = await configService.get(url);
                const {sprites} = data;
                let imageUrl =sprites.other.dream_world.front_default; // Accede a la URL de la imagen
                if (!imageUrl) {
                    imageUrl =
                       sprites.other.home.front_default ||
                        "/pokebola.jpg";
                }
                console.log("moves",  data.abilities.slice(0,2));
                
                return {
                    id:data.id,
                    name:data.name,
                    imageUrl: imageUrl,
                    abilities:data?.abilities.slice(0,2) || [],
                    moves:data?.moves.slice(0,2) || [],
                    types:data?.types.slice(0,2) || [],
                    weight:data?.weight,
                    height:data?.height
                };
            } catch (error) {
                console.error("Error al obtener la imagen del Pokémon:", error);
            }
        },

        async fetchAllPokemonImages() {
            const pokemonList = await this.getPokemons();
            const promises = pokemonList.map(
                async (pokemon) => await this.fetchPokemonImage(pokemon.url)
            );
            // Espera a que se resuelvan todas las promesas
            const pokemonImages = await Promise.all(promises);
            this.items = pokemonImages;
        },
        async handleSearch(term) {
            this.loading = true
            if(term){
                const pokemons = this.filteredItems.filter((item) =>
                    item.name.toLowerCase().includes(term.toLowerCase())
                );
    
                const promises = pokemons.map(
                    async (pokemon) => await this.fetchPokemonImage(pokemon.url)
                );
                // Espera a que se resuelvan todas las promesas
                const pokemonImages = await Promise.all(promises);

                this.items = pokemonImages;
                this.totalRows = pokemonImages.length;
                this.loading = false
            }else{
                await this.fetchAllPokemonImages()
                this.loading = false
            }
        },
    },
};
