import React from 'react';

const TextInput = ({ label, name, placeholder, required, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}{required && '*'}</label><br />
      <input 
        type="text" 
        placeholder={placeholder} 
        name={name} 
        required={required} 
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default TextInput;