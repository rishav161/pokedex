import { Column, Input } from "../common";
import PropTypes from "prop-types";

const InputGroup = ({ data }) => {
  return (
    <Column width={"100%"} align={"flex-start"} gap={"8px"}>
      <label
        style={{
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        {data?.label}
      </label>
      <Input
        placeholder={data?.placeholder}
        onChange={data?.onChange}
        onBlur={data?.onBlur}
        value={data?.value}
        type={data?.type}
      />
    </Column>
  );
};

InputGroup.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
  }).isRequired,
};

export default InputGroup;
