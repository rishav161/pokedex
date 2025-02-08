import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const modalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <modalContext.Provider
      value={{ modal, setModal, data: modalData, setData: setModalData }}
    >
      {children}
    </modalContext.Provider>
  );
};

// Add PropTypes for children
ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContextProvider;
