import React, { useState, useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
    age: '', // Added age field to formData
  });

  const [usersData, setUsersData] = useState({
    users: [],
    countries: [],
    states: [],
    cities: [],
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const navigate =  useNavigate();
  const [formErrors, setFormErrors] = useState({}); // State to store form validation errors

  useEffect(() => {
    // Fetch all users and related data from the backend API
    axios.get('/user/getAllUsers')
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users and related data:', error);
      });
  }, []);

  const { users, countries, states, cities } = usersData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedCountry,
      state: '', // Reset state when country changes
      city: '', // Reset city when country changes
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: selectedState,
      city: '', // Reset city when state changes
    }));
  };

  const handleDateOfBirthChange = (e) => {
    const dateOfBirth = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfBirth,
      age: calculateAge(dateOfBirth), // Calculate age and update the formData
    }));
  };

  const calculateAge = (dateOfBirth) => {
    const dobDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - dobDate;
    const ageDate = new Date(ageInMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to save the registration data
    axios.post('/user/register', formData)
      .then((response) => {
        // Handle the success response (if needed)
        
        setIsRegistered(true);
      alert("Register successfully");


          setFormErrors({}); // Clear the form errors on successful registration

          navigate("/UserPageList")


    
      })
      .catch((error) => {
        // Handle the error response and set the validation errors (if any)
        if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            setFormErrors(errors);
            const errorMessage = Object.values(errors).join('\n');
            alert(errorMessage);
          }
          console.log('Error saving registration:', error);
      });
  };

  return (
    <div>
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" value={formData.country} onChange={handleCountryChange} required>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <select id="state" name="state" value={formData.state} onChange={handleStateChange} required>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <select id="city" name="city" value={formData.city} onChange={handleInputChange} required>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Gender</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleInputChange}
            required
          />{' '}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleInputChange}
            required
          />{' '}
          Female
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleDateOfBirthChange} // Handle DOB change to calculate age
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age" value={formData.age} readOnly />
      </div>
      <button type="submit">Save</button>
      {isRegistered && <p className="success-message">Registration Successful!</p>}
    </form>
    {Object.keys(formErrors).length > 0 && (
        <div className="error-message">
          <p>Validation Errors:</p>
          <ul>
            {Object.entries(formErrors).map(([field, message]) => (
              <li key={field}>
                <span className="error-field">{field}:</span> {message}
              </li>
            ))}
          </ul>
        </div>
      )}

      </div>
  );
};