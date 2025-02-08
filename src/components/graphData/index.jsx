import { Row } from "../common";
import DataBar from "./dataBar";
import PropTypes from "prop-types";

const GraphData = ({ icon, value }) => {
  return (
    <Row
      gap={"8px"}
      width={"90%"}
      justify={"flex-end"}
      style={{
        margin: "8px 0",
      }}
    >
      <i className={`fa-solid fa-${icon}`}></i>
      <p>{value}</p>
      <DataBar value={value} />
    </Row>
  );
};

GraphData.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default GraphData;
