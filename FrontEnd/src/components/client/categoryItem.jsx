import PropTypes from 'prop-types';
const CategoryItem = ({ category }) => {
  return (
    <div className="category-item">
      <img src={category.imageUrl} alt={category.name} className="category-image" />
      <h2>{category.name}</h2>
      <p>{category.description}</p>
    </div>
  );
}
CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired
};
export default CategoryItem;