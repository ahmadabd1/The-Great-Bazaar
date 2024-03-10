import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { BsTrash, BsEye, BsPencil, BsPlusCircle, BsDash, BsPlus } from 'react-icons/bs';
import "../style/CategoryComponent.css";

const CategoryComponent = ({ category, deleteCategory, deleteSubcategory }) => {
  const [subCategories, setSubCategories] = useState([])
  const [showSubCategories, setShowSubCategories] = useState(false)
  const [hasSubCategories, setHasSubCategories] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:8080/category/subcategories/${category._id}`)
      .then(response => {
        setSubCategories(response.data)
        setHasSubCategories(response.data.length > 0)
      })
      .catch(error => {
        console.error('Error fetching subcategories:', error)
        setSubCategories([])
        setHasSubCategories(false)
      })
  }, [category._id, showSubCategories])

  const handleDeleteSubcategory = (subcategoryId, e) => {
    e.stopPropagation()
    deleteSubcategory(subcategoryId)
      .then(() => {
        setSubCategories(currentSubCategories => currentSubCategories.filter(subCat => subCat._id !== subcategoryId))
        if (subCategories.length <= 1) {
          setHasSubCategories(false) 
        }
      })
      .catch(error => {
        console.error('Error deleting subcategory:', error)
      })
  }

  const logAction = (action, name) => {
    console.log(`${action} action for: ${name}`)
  }

  return (
    
    <Container>

      <div className="category-row">
        <div onClick={() => setShowSubCategories(!showSubCategories)}>
          {hasSubCategories ? (showSubCategories ? <BsDash /> : <BsPlusCircle />) : null}
        </div>
        <span className="category-name">{category.name}</span>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <BsEye color="green" onClick={() => logAction('Review', category.name)}/>
          <BsPencil color="blue" onClick={() => logAction('Edit', category.name)}/>
          <BsPlus color="orange" onClick={() => logAction('Add/Edit Items', category.name)}/>
          <BsTrash color="red" onClick={(e) => { e.stopPropagation(); deleteCategory(category._id); }}/>
        </div>
      </div>
      {showSubCategories && subCategories.map((subCategory, index) => (
        
        <div key={index} className="sub-category-row">
          <BsPlusCircle onClick={() => logAction('Review', subCategory.name)}/>
          <span className="sub-category-name">{subCategory.name}</span>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <BsEye color="green" onClick={() => logAction('Review', subCategory.name)}/>
            <BsPencil color="blue" onClick={() => logAction('Edit', subCategory.name)}/>
            <BsPlus color="orange" onClick={() => logAction('Add/Edit Items', subCategory.name)} />
            <BsTrash color="red" onClick={(e) => handleDeleteSubcategory(subCategory._id, e)}/>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default CategoryComponent;
