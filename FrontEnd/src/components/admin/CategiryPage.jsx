import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryComponent from './CategoryComponent';
import { Container , Button } from 'react-bootstrap';

const CategiryPage = () => {
  const [categories, setCategories] = useState([])
  const [deletionCount, setDeletionCount] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:8080/category/categories?parentCategoryId=null')
      .then(response => setCategories(response.data.filter(category => !category.parentCategoryId)))
      .catch(error => console.error("Error fetching categories:", error))
  }, [deletionCount])

  const deleteCategory = (categoryId) => {
    return axios.delete(`http://localhost:8080/category/${categoryId}`)
      .then(() => setDeletionCount(count => count + 1))
      .catch(error => console.error("Error deleting category:", error))
  }

  const deleteSubcategory = (subcategoryId) => {
    return axios.delete(`http://localhost:8080/category/subcategory/${subcategoryId}`)
      .then(() => setDeletionCount(count => count + 1))
      .catch(error => console.error("Error deleting subcategory:", error))
  }

  return (
    <>
    <div>
    <Button >Add Category</Button>
  </div>
    <Container>
      {categories.map((category, index) => (
        <CategoryComponent
          key={index}
          category={category}
          deleteCategory={deleteCategory}
          deleteSubcategory={deleteSubcategory}
        />
      ))}
    </Container>
    </>
  )
}

export default CategiryPage
