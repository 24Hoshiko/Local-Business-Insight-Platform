import React, { useState } from 'react';
import '../styles/CustomerView.css';

const CustomerView = () => {
    const [searchTerm, setSearchTerm] = useState({
        custName: '',
        order_id: '',
        rating: '',
    });
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchTerm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`http://localhost:8000/search?custName=${searchTerm.custName}&order_id=${searchTerm.order_id}&rating=${searchTerm.rating}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecords(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching records:', err);
        }
    };

    return (
        <div className="customer-view-container">
                <form onSubmit={handleSearch}>
                <div>
                    <label>
                        Search by Name:
                        <input
                            type="text"
                            name="custName"
                            value={searchTerm.custName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Search by Order ID:
                        <input
                            type="text"
                            name="order_id"
                            value={searchTerm.order_id}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Search by Rating:
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            value={searchTerm.rating}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Search</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="results-container">
                {records.length > 0 ? (
                    <ul>
                        {records.map((record) => (
                            <li key={record.order_id}>
                                <h3>{record.custName}</h3>
                                <p>Contact: {record.custContact}</p>
                                <p>Order ID: {record.order_id}</p>
                                <p>Rating: {record.rating} stars</p>
                                <h4>Products:</h4>
                                <ul>
                                    {record.products.map((product, index) => (
                                        <li key={index}>
                                            {product.productName} - Quantity: {product.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No records found.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerView;
