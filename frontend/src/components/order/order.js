import React, { useState, useEffect } from 'react';
import { getAuthToken } from "../../services/BackendService";
import './order.css';

function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    surname: '',
    mobileNumber: '',
    address: ''
  });
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('JWT token not found');
      }

      // Fetch user data
      const userResponse = await fetch('http://localhost:8080/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      setUserInfo(prevState => ({
        ...prevState,
        email: userData.email
      }));

      // Fetch user info
      const userInfoResponse = await fetch('http://localhost:8080/user-info/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (userInfoResponse.ok) {
        const userInfoData = await userInfoResponse.json();
        setUserInfo(prevState => ({
          ...prevState,
          name: userInfoData.name || '',
          surname: userInfoData.surname || '',
          mobileNumber: userInfoData.mobileNumber || '',
          address: userInfoData.address || ''
        }));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    const { email, ...userInfoWithoutEmail } = userInfo;

    try {
      // Update user info
      const userInfoResponse = await fetch('http://localhost:8080/user-info/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userInfoWithoutEmail)
      });

      if (!userInfoResponse.ok) {
        throw new Error('Failed to update user information');
      }

      // Submit order
      const orderData = {
        address: userInfo.address,
        service
      };

      const orderResponse = await fetch('http://localhost:8080/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to submit order');
      }

      alert('Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-info">
      <h2>User Information</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userInfo.email} readOnly />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Surname:</label>
          <input type="text" name="surname" value={userInfo.surname} onChange={handleInputChange} />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" value={userInfo.mobileNumber} onChange={handleInputChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} />
        </div>
        <div>
          <label>Service:</label>
          <select value={service} onChange={e => setService(e.target.value)}>
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
          </select>
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default UserInfo;
