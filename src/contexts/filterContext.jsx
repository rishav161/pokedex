import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const filterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    type: null,
    habitat: null,
    name: null,
  });

  return (
    <filterContext.Provider value={{ filters, setFilters }}>
      {children}
    </filterContext.Provider>
  );
};

// Add PropTypes for children
FilterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterContextProvider;
