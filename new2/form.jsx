import React, { useState } from 'react';
import './DynamicForm.css';

// Form configuration schema
const formConfig = [
    {
        type: 'text',
        name: 'name',
        label: 'Name',
        placeholder: 'Enter your name',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 30,
            pattern: /^[A-Za-z\s]+$/,
            errorMessage: 'Name must be 3-30 characters and contain only letters.',
        },
    },
    {
        type: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Invalid email address.',
        },
    },
    {
        type: 'select',
        name: 'state',
        label: 'State',
        options: ['California', 'Texas', 'New York', 'Florida'],
        required: true,
        validation: {
            errorMessage: 'Please select a state.',
        },
    },
    {
        type: 'radio',
        name: 'gender',
        label: 'Gender',
        options: ['Male', 'Female', 'Other'],
        required: true,
        validation: {
            errorMessage: 'Please select a gender.',
        },
    },
    {
        type: 'textarea',
        name: 'address',
        label: 'Address',
        placeholder: 'Enter your address',
        required: true,
        validation: {
            minLength: 10,
            maxLength: 100,
            errorMessage: 'Address must be 10-100 characters.',
        },
    },
    {
        type: 'checkbox',
        name: 'terms',
        label: 'I agree to the terms and conditions',
        required: true,
        validation: {
            errorMessage: 'You must agree to the terms.',
        },
    },
    {
        type: 'button',
        label: 'Submit',
    },
];

const DynamicForm = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Validate form field
    const validateField = (name, value, validation) => {
        if (validation?.required && !value) {
            return validation.errorMessage || 'This field is required.';
        }
        if (validation?.minLength && value.length < validation.minLength) {
            return validation.errorMessage || `Minimum length is ${validation.minLength}.`;
        }
        if (validation?.maxLength && value.length > validation.maxLength) {
            return validation.errorMessage || `Maximum length is ${validation.maxLength}.`;
        }
        if (validation?.pattern && !validation.pattern.test(value)) {
            return validation.errorMessage || 'Invalid format.';
        }
        return '';
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        formConfig.forEach((field) => {
            if (field.type !== 'button') {
                const error = validateField(
                    field.name,
                    formData[field.name] || '',
                    field.validation
                );
                if (error) {
                    newErrors[field.name] = error;
                }
            }
        });

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted successfully:', formData);
            alert('Form submitted successfully!');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="dynamic-form">
            {formConfig.map((field, index) => {
                switch (field.type) {
                    case 'text':
                    case 'email':
                    case 'textarea':
                        return (
                            <div key={index} className="form-field">
                                <label>{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                    />
                                )}
                                {errors[field.name] && <span className="error">{errors[field.name]}</span>}
                            </div>
                        );
                    case 'select':
                        return (
                            <div key={index} className="form-field">
                                <label>{field.label}</label>
                                <select
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an option</option>
                                    {field.options.map((option, i) => (
                                        <option key={i} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {errors[field.name] && <span className="error">{errors[field.name]}</span>}
                            </div>
                        );
                    case 'radio':
                        return (
                            <div key={index} className="form-field">
                                <label>{field.label}</label>
                                {field.options.map((option, i) => (
                                    <div key={i} className="radio-option">
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={option}
                                            checked={formData[field.name] === option}
                                            onChange={handleChange}
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                                {errors[field.name] && <span className="error">{errors[field.name]}</span>}
                            </div>
                        );
                    case 'checkbox':
                        return (
                            <div key={index} className="form-field">
                                <label>
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        checked={formData[field.name] || false}
                                        onChange={handleChange}
                                    />
                                    {field.label}
                                </label>
                                {errors[field.name] && <span className="error">{errors[field.name]}</span>}
                            </div>
                        );
                    case 'button':
                        return (
                            <button key={index} type="submit">
                                {field.label}
                            </button>
                        );
                    default:
                        return null;
                }
            })}
        </form>
    );
};

export default DynamicForm;