import { useContext, useState } from "react";
import PropTypes from 'prop-types'; // Add this import
import { filterContext } from "../../../../../contexts/filterContext";
import {
  DropdownBtn,
  DropdownContainer,
  DropdownItem,
  DropdownList,
} from "../common";
import { habitats } from "./../../../../../constants/habitats";

const HabitatsDropdown = ({ name }) => {
  const { setFilters } = useContext(filterContext);
  const [active, setActive] = useState(false);

  const handleCheck = (habitat) => {
    setFilters((prev) => ({
      ...prev,
      habitat: habitat,
    }));
    setActive(false);
  };

  return (
    <DropdownContainer>
      <DropdownBtn
        onClick={() => {
          setActive(!active);
        }}
      >
        {name}
        <span>
          <i className={`fas fa-chevron-${active ? "up" : "down"}`} />
        </span>
      </DropdownBtn>
      <DropdownList className={active ? "active" : ""}>
        {active &&
          habitats.map((habitat) => (
            <DropdownItem
              key={habitat}
              value={habitat}
              onClick={() => {
                handleCheck(habitat);
              }}
            >
              {habitat}
            </DropdownItem>
          ))}
      </DropdownList>
    </DropdownContainer>
  );
};

// Add PropTypes validation
HabitatsDropdown.propTypes = {
  name: PropTypes.string.isRequired
};

export default HabitatsDropdown;