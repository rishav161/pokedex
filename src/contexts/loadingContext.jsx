import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const loadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </loadingContext.Provider>
  );
};

// Add PropTypes for children
LoadingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingContextProvider;
