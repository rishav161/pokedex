import { InfoText, InfoTitle } from "..";
import { Column } from "../../../../components/common";
import PropTypes from "prop-types"; 

const PersonalInfo = ({ title, value }) => {
  return (
    <Column width={"max-content"} gap={"8px"} align={"flex-start"}>
      <InfoTitle>{title}: </InfoTitle>
      <InfoText>{value}</InfoText>
    </Column>
  );
};

// Add PropTypes for title and value
PersonalInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PersonalInfo;
