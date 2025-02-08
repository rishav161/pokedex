import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Add prop-types import

const ProtectedRoute = ({ Component }) => {
  return sessionStorage.getItem("token") ? <Component /> : <Navigate to="/" />;
};

// Add prop types validation
ProtectedRoute.propTypes = {
  Component: PropTypes.elementType.isRequired
};

export default ProtectedRoute; // Fixed the export statement typo