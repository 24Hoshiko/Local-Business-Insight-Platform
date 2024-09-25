/* Importing packages */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const fs = require('fs');
const csv = require('csv-parser');

/* Load environment variables from .env file */
dotenv.config();

/* Get MongoDB connection string from .env */
const uri = process.env.MONGODB_CONNECTION;

const app = express();

/* Define Mongoose schema and model for the sales data */
const salesSchema = new mongoose.Schema({
    orderNumber: Number,
    quantityOrdered: Number,
    priceEach: Number,
    orderLineNumber: Number,
    sales: Number,
    orderDate: Date,
    status: String,
    qtrId: Number,
    monthId: Number,
    yearId: Number,
    productLine: String,
    msrp: Number,
    productCode: String,
    customerName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    territory: String,
    contactLastName: String,
    contactFirstName: String,
    dealSize: String
});

const Sale = mongoose.model('Sale', salesSchema);

/* Async function to connect to MongoDB */
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error occurred while connecting to MongoDB:", error);
    }
}

/* Function to import data from CSV and insert it into MongoDB */
function importCSVData(filePath) {
    const salesData = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const sale = new Sale({
                orderNumber: Number(row.ORDERNUMBER),
                quantityOrdered: Number(row.QUANTITYORDERED),
                priceEach: parseFloat(row.PRICEEACH),
                orderLineNumber: Number(row.ORDERLINENUMBER),
                sales: parseFloat(row.SALES),
                orderDate: new Date(row.ORDERDATE),
                status: row.STATUS,
                qtrId: Number(row.QTR_ID),
                monthId: Number(row.MONTH_ID),
                yearId: Number(row.YEAR_ID),
                productLine: row.PRODUCTLINE,
                msrp: parseFloat(row.MSRP),
                productCode: row.PRODUCTCODE,
                customerName: row.CUSTOMERNAME,
                phone: row.PHONE,
                addressLine1: row.ADDRESSLINE1,
                addressLine2: row.ADDRESSLINE2 || null, // Handle potential empty values
                city: row.CITY,
                state: row.STATE || null, // Handle potential empty values
                postalCode: row.POSTALCODE || null, // Handle potential empty values
                country: row.COUNTRY,
                territory: row.TERRITORY,
                contactLastName: row.CONTACTLASTNAME,
                contactFirstName: row.CONTACTFIRSTNAME,
                dealSize: row.DEALSIZE
            });
            salesData.push(sale);
        })
        .on('end', async () => {
            try {
                await Sale.insertMany(salesData);
                console.log('CSV data has been successfully imported into MongoDB');
            } catch (error) {
                console.error('Error inserting data into MongoDB:', error);
            }
        });
}

/* Connect to MongoDB */
connect();

/* Import data from CSV after MongoDB connection */
importCSVData('./sales_data_sample.csv');

/* Start the server */
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
