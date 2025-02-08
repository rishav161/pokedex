import styled from "styled-components";
import { Column } from "../common";
import PropTypes from "prop-types"; // Import PropTypes

const StatsName = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const StatsValue = styled.h2`
  font-size: 24px;
  color: white;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const Stats = ({ name, icon, value, unit }) => {
  const val = parseFloat(value) / 10;

  return (
    <Column>
      <StatsValue>
        {unit === "m" ? val : value} {unit}
      </StatsValue>
      <StatsName>
        <i className={`fa-solid fa-${icon}`}></i>
        {name}
      </StatsName>
    </Column>
  );
};

// Add PropTypes validation
Stats.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
};

export default Stats;
