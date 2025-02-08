import { useContext } from "react";
import PropTypes from 'prop-types';
import { Button, TypeMarker } from "../../../../components/common";
import { filterContext } from "../../../../contexts/filterContext";
import icons from "../../../../constants/icons";
import colors from "../../../../constants/colors";

const SelectedFilter = ({ name, type }) => {
  const { setFilters } = useContext(filterContext);

  const handleRemove = () => {
    setFilters((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  return (
    <Button>
      {icons[name.toLowerCase()] && (
        <TypeMarker
          bg={colors.types[name.toLowerCase()]}
          rounded={true}
          width={"10px"}
          height={"10px"}
        >
          <img src={icons[name.toLowerCase()]} alt={type} />
        </TypeMarker>
      )}
      {name}
      <span onClick={handleRemove}>
        <i className="fas fa-times" />
      </span>
    </Button>
  );
};

// Add PropTypes validation
SelectedFilter.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default SelectedFilter;