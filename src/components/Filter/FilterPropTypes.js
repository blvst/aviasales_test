import PropTypes from "prop-types";

export default {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.boolean,
    }),
  ),
  onChange: PropTypes.func,
}