import React, { useState } from 'react';
import './ProductListPage.css';

// Sample product data
const productsData = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, rating: 4.5 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, rating: 4.2 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 150, rating: 4.7 },
    { id: 4, name: 'Sofa', category: 'Furniture', price: 500, rating: 4.0 },
    { id: 5, name: 'Table', category: 'Furniture', price: 200, rating: 3.8 },
    { id: 6, name: 'Chair', category: 'Furniture', price: 100, rating: 4.1 },
    { id: 7, name: 'T-Shirt', category: 'Clothing', price: 20, rating: 4.3 },
    { id: 8, name: 'Jeans', category: 'Clothing', price: 50, rating: 4.4 },
    { id: 9, name: 'Shoes', category: 'Clothing', price: 80, rating: 4.6 },
];

const ProductListPage = () => {
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
    });

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // Filter products based on selected filters
    const filteredProducts = productsData.filter((product) => {
        return (
            (filters.category === '' || product.category === filters.category) &&
            (filters.minPrice === '' || product.price >= parseFloat(filters.minPrice)) &&
            (filters.maxPrice === '' || product.price <= parseFloat(filters.maxPrice)) &&
            (filters.minRating === '' || product.rating >= parseFloat(filters.minRating))
        );
    });

    return (
        <div className="product-list-page">
            <h1>Product List</h1>

            {/* Filters Section */}
            <div className="filters">
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                </select>

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                />

                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                />

                <input
                    type="number"
                    name="minRating"
                    placeholder="Min Rating"
                    value={filters.minRating}
                    onChange={handleFilterChange}
                    min="0"
                    max="5"
                    step="0.1"
                />
            </div>

            {/* Product List */}
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.name}</h2>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating} ⭐</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;

import React from "react";
import { useFilter } from "../context/FilterContext";
import ProductItem from "./ProductItem";

const ProductList = () => {
    const { filteredProducts } = useFilter();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;

import React, { useCallback } from "react";
import { useFilter } from "../context/FilterContext";

const Filters = () => {
    const { selectedCategory, setSelectedCategory, maxPrice, setMaxPrice, categories } = useFilter();

    // Memoized Handlers
    const handleCategoryChange = useCallback((e) => setSelectedCategory(e.target.value), []);
    const handlePriceChange = useCallback((e) => setMaxPrice(Number(e.target.value)), []);

    return (
        <div className="flex gap-4 mb-4">
            <select className="border p-2 rounded" value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <input type="range" min="0" max="2000" step="50" value={maxPrice} onChange={handlePriceChange} className="cursor-pointer" />
            <span className="font-semibold">Max Price: ${maxPrice}</span>
        </div>
    );
};

export default Filters;

import React, { createContext, useContext, useState, useMemo } from "react";

// Product Data
const products = [
    { id: 1, name: "iPhone 14", category: "Electronics", price: 999 },
    { id: 2, name: "MacBook Air", category: "Electronics", price: 1299 },
    { id: 3, name: "Nike Shoes", category: "Fashion", price: 150 },
    { id: 4, name: "T-Shirt", category: "Fashion", price: 30 },
    { id: 5, name: "Samsung TV", category: "Electronics", price: 799 },
    { id: 6, name: "Adidas Jacket", category: "Fashion", price: 120 },
];

const categories = ["All", "Electronics", "Fashion"];

// Create Context
const FilterContext = createContext(null);

// Context Provider
export const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [maxPrice, setMaxPrice] = useState(1000);

    // Memoized filtered products
    const filteredProducts = useMemo(() => {
        return products.filter(
            (product) =>
                (selectedCategory === "All" || product.category === selectedCategory) &&
                product.price <= maxPrice
        );
    }, [selectedCategory, maxPrice]);

    return (
        <FilterContext.Provider value={{ selectedCategory, setSelectedCategory, maxPrice, setMaxPrice, filteredProducts, categories }}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom Hook for easy access
export const useFilter = () => {
    return useContext(FilterContext);
};
