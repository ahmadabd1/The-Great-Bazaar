import  { useState, useEffect } from 'react';
import CategoryItem from './categoryItem';
import '../style/CategoryPage.css';
const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/category/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  return (
    <div className="category-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1 className="page-title">Categories</h1>
      <div className="category-list">
        {categories
          .filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(category => (
            <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
export default CategoryPage;