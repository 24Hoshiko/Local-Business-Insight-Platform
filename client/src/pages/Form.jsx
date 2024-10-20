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

  const handleInputChange = (name, value) => {
    if (name === 'items') {
      // If items is updated, adjust quantities accordingly
      const newQuantities = { ...formValues.quantities };
      Object.keys(value).forEach((item) => {
        if (value[item]) {
          // If the item is selected, ensure there is a quantity entry
          newQuantities[item] = newQuantities[item] || 1; // Default quantity to 1
        } else {
          // If the item is unselected, remove it from quantities
          delete newQuantities[item];
        }
      });
      setFormValues((prev) => ({ ...prev, [name]: value, quantities: newQuantities }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues), // Send form values
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Show success message
          // Reset form values
          setFormValues({
            name: '',
            contact: '',
            items: {},
            quantities: {},
            rating: null,
            review: ''
          });
        } else {
          alert(data.message); // Show error message
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h1>Help Us Serve You Better <br /> - Brown Bakery</h1>
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
