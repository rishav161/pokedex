import { habitats } from '../constants/habitats';

const url = "https://pokeapi.co/api/v2/";
const itemsPerPage = 10;
const options = {
  get: {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
};

const pokeApi = {
  getPokemon: async (endpoint) => {
    const response = await fetch(endpoint, options.get);
    const data = await response.json();
    return data;
  },
  
  getPokemonsByHabitat: async (habitat) => {
    try {
      const id = habitats.findIndex(h => h === habitat) + 1;
      const response = await fetch(`${url}pokemon-habitat/${id}`, options.get);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  
  getPokemonsByType: async (type) => {
    try {
      const response = await fetch(`${url}type/${type.toLowerCase()}`, options.get);
      const data = await response.json();
      return data.pokemon;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  
  filterPokemonByHabitat: async (habitat) => {
    const res = await pokeApi.getPokemonsByHabitat(habitat);
    return res ? res.pokemon_species : [];
  },

  filterPokemonByType: async (type, data = []) => {
    const pokemonsByType = await pokeApi.getPokemonsByType(type);
    if (!pokemonsByType) {
      return [];
    }

    if (data.length === 0) {
      return pokemonsByType;
    }

    const dataNames = new Set(data.map(pokemon => pokemon.name));
    return pokemonsByType.filter(pokemon => dataNames.has(pokemon.pokemon.name));
  },

  getFilteredPokemons: async (filters, offset = 0, data = []) => {
    const res = {
      count: 0,
      next: null,
      previous: null,
      results: [],
      all: [],
    };

    try {
      if (filters.name) {
        const targetData = res.results.length === 0 ? data : res.results;
        res.all = targetData.filter(pokemon => pokemon.name.includes(filters.name.toLowerCase()));
      }

      if (filters.habitat) {
        const aux = [];
        const a = await pokeApi.filterPokemonByHabitat(filters.habitat);
        if (res.all.length === 0) {
          a.forEach(pokemon => aux.push({ name: pokemon.name, url: pokemon.url.replace("-species", "") }));
        } else {
          const dataNames = new Set(res.all.map(pokemon => pokemon.name));
          a.forEach(pokemon => {
            if (dataNames.has(pokemon.name)) {
              aux.push({ name: pokemon.name, url: pokemon.url });
            }
          });
        }
        res.all = aux;
      }

      if (filters.type) {
        const a = await pokeApi.filterPokemonByType(filters.type, data);
        if (res.all.length === 0 && (!filters.habitat && !filters.name)) {
          a.forEach(pokemon => res.all.push({ name: pokemon.pokemon.name, url: pokemon.pokemon.url }));
        } else {
          const dataNames = new Set(res.all.map(pokemon => pokemon.name));
          const aux = [];
          a.forEach(pokemon => {
            if (dataNames.has(pokemon.pokemon.name)) {
              aux.push({ name: pokemon.pokemon.name, url: pokemon.pokemon.url });
            }
          });
          res.all = aux;
        }
      }

      res.count = res.all.length;
      res.results = res.all.slice(offset, offset + itemsPerPage);
      res.next = offset + itemsPerPage < res.all.length ? offset + itemsPerPage : null;
      res.previous = offset > 0 ? offset - itemsPerPage : null;

      return res;
    } catch (error) {
      console.error(error);
      return res;
    }
  },

  getRandomPokemon: async () => {
    try {
      const randomId = Math.floor(Math.random() * 1010);
      const response = await fetch(`${url}pokemon/${randomId}`, options.get);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  getAllPokemons: async () => {
    try {
      const response = await fetch(`${url}pokemon?limit=100000&offset=0`, options.get);
      const data = await response.json();
      return {
        count: data.count,
        next: itemsPerPage,
        previous: null,
        results: data.results
      };
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default pokeApi;
