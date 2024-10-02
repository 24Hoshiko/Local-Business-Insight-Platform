import React from 'react';

const CheckboxGroup = ({ label, options, items, quantities, onChange, error }) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    onChange('items', { ...items, [name]: checked });
    if (!checked) {
      onChange('quantities', { ...quantities, [name]: '' });
    }
  };

  const handleQuantityChange = (event) => {
    const { name, value } = event.target;
    onChange('quantities', { ...quantities, [name]: value });
  };

  return (
    <div>
      <label>{label}</label>
      <div>
        {options.map((option) => (
          <div key={option.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="checkbox"
              name={option.value}
              checked={items[option.value] || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={option.value} style={{ marginLeft: '5px' }}>{option.label}</label>
            {items[option.value] && (
              <input
                type="number"
                name={option.value}
                min="1"
                placeholder="Quantity"
                value={quantities[option.value] || ''}
                onChange={handleQuantityChange}
                style={{ marginLeft: '10px', width: '100px' }}
              />
            )}
          </div>
        ))}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    </div>
  );
};

export default CheckboxGroup;