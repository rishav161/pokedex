import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import serverApi from "../services/serverApi";
import pokeApi from "../services/pokeApi";

// Create the context
export const pokeContext = createContext();

// Initial state object
const initialState = {
  count: 0,
  next: 10,
  previous: null,
  results: [],
  all: [],
  captured: [],
  fixed: [],
  error: null,
  loading: false
};

// Create the provider component
export const PokeContextProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState(initialState);

  // Get captured pokemons from server
  const getCapturedPokemons = async () => {
    try {
      setPokemons(prev => ({ ...prev, loading: true }));
      const res = await serverApi.getCapturedPokemons();
      if (res.data) {
        setPokemons(prev => ({
          ...prev,
          captured: res.data,
          error: null
        }));
      }
    } catch (error) {
      console.error('Error fetching captured Pokemon:', error);
      setPokemons(prev => ({
        ...prev,
        error: 'Failed to fetch captured Pokemon'
      }));
    } finally {
      setPokemons(prev => ({ ...prev, loading: false }));
    }
  };

  // Get all pokemons data
  const getData = async () => {
    try {
      setPokemons(prev => ({ ...prev, loading: true }));
      const res = await pokeApi.getAllPokemons();
      
      if (res) {
        await getCapturedPokemons();
        setPokemons(prev => ({
          ...prev,
          count: res.count,
          next: 10,
          previous: null,
          results: res.results.slice(0, 10),
          all: res.results,
          fixed: res.results,
          error: null
        }));
      }
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setPokemons(prev => ({
        ...prev,
        error: 'Failed to fetch Pokemon data'
      }));
    } finally {
      setPokemons(prev => ({ ...prev, loading: false }));
    }
  };

  // Refresh pokemons state
  const refreshPokemons = () => {
    return pokemons;
  };

  // Create context value object
  const contextValue = {
    pokemons,
    setPokemons,
    getData,
    getPokemons: refreshPokemons,
  };

  return (
    <pokeContext.Provider value={contextValue}>
      {children}
    </pokeContext.Provider>
  );
};

PokeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const PokeProvider = PokeContextProvider;
