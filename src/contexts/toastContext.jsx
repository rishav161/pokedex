import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create the context
export const toastContext = createContext();

// Initial state
const initialState = {
  open: false,
  title: "",
  message: "",
  type: "info", // info, success, error, warning
};

// Create the provider component
export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState(initialState);

  // Helper function to show toast
  const showToast = (title, message, type = "info") => {
    setToast({
      open: true,
      title,
      message,
      type,
    });
  };

  // Helper function to hide toast
  const hideToast = () => {
    setToast(initialState);
  };

  const contextValue = {
    toast,
    setToast,
    showToast,
    hideToast,
  };

  return (
    <toastContext.Provider value={contextValue}>
      {children}
    </toastContext.Provider>
  );
};

// Add PropTypes for children
ToastContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export an alias for ToastContextProvider to fix the import error
export const ToastProvider = ToastContextProvider;
