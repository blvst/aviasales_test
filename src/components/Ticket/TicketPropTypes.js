import PropTypes from 'prop-types';

export default PropTypes.shape({
  carrier: PropTypes.string,
  price: PropTypes.number,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      destination: PropTypes.string,
      duration: PropTypes.number,
      origin: PropTypes.string,
      stops: PropTypes.arrayOf(PropTypes.string)
    }),
  ),
});
