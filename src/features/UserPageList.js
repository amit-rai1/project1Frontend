import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserListPage.css';

const UserPageList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get('http://localhost:5001/user/getAllUsers')
      .then(response => {
        setUserData(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="user-list-container">
      <h2>User Data</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>

            <th>Email</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Age</th>


          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>{user.gender}</td>
              <td>{user.dateOfBirth}</td>

              <td>{user.age}</td>




            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPageList;
