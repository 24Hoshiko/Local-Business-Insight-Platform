import React, { useState } from 'react';
import '../styles/Form.css';
import TextInput from '../components/form/TextInput.jsx';
import Rating from '../components/form/Rating.jsx';
import TextReview from '../components/form/TextReview.jsx';
import CheckboxGroup from '../components/form/CheckboxGroup.jsx';

function App() {
  const items = [
    { value: 'Cake', label: 'Cake' },
    { value: 'Pastries', label: 'Pastries' },
    { value: 'Cookies', label: 'Cookies' },
    { value: 'Doughnuts', label: 'Doughnuts' },
    { value: 'Cream rolls', label: 'Cream rolls' },
    { value: 'Bread', label: 'Bread' },
  ];

  const [formValues, setFormValues] = useState({
    name: '',
    contact: '',
    items: {},
    quantities: {},
    rating: null,
    review: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!formValues.name.trim()) formErrors.name = "Name is required";
    
    if (!formValues.contact.trim()) {
      formErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formValues.contact)) {
      formErrors.contact = "Contact number must be 10 digits";
    }

    if (Object.keys(formValues.items).length === 0) formErrors.items = "At least one item must be selected";
    Object.keys(formValues.quantities).forEach(item => {
      if (formValues.items[item] && (!formValues.quantities[item] || formValues.quantities[item] <= 0)) {
        formErrors.quantities = "Please specify quantity for selected items";
      }
    });

    if (!formValues.rating) formErrors.rating = "Rating is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setFormValues({
        name: '',
        contact: '',
        items: {},
        quantities: {},
        rating: null,
        review: ''
      });
    }
  };

  const handleInputChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="main-container">

    <div className="form-container">
      <h1>help us serve you better <br />- Brown Bakery</h1>
      <form onSubmit={handleSubmit}>
        <TextInput 
          label="Name" 
          name="name" 
          placeholder="Enter your name" 
          required={true} 
          value={formValues.name} 
          onChange={handleInputChange}
          error={errors.name}
          />
        <TextInput 
          label="Contact" 
          name="contact" 
          placeholder="Enter Contact no." 
          required={true} 
          value={formValues.contact} 
          onChange={handleInputChange}
          error={errors.contact}
          />
        <CheckboxGroup
          label="Items Purchased"
          name="items"
          options={items}
          required={true}
          items={formValues.items}
          quantities={formValues.quantities}
          onChange={handleInputChange}
          error={errors.items || errors.quantities}
          />
        <div>
          <label>Rate Us:</label>
          <Rating 
            rating={formValues.rating} 
            onChange={(rating) => handleInputChange('rating', rating)}
            error={errors.rating}
            />
        </div>
        <TextReview 
          value={formValues.review}
          onChange={(review) => handleInputChange('review', review)}
          />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default App;