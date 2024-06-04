import React, { useState, useEffect } from 'react';
import { getAuthToken } from "../../services/BackendService";
import './UserInfo.css';

function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    surname: '',
    mobileNumber: '',
    address: ''
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchUserOrders();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('JWT token not found');
      }

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

  const fetchUserOrders = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('JWT token not found');
      }

      const ordersResponse = await fetch('http://localhost:8080/orders/my-orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!ordersResponse.ok) {
        throw new Error('Failed to fetch orders');
      }

      const ordersData = await ordersResponse.json();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
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

    // Usuń email z obiektu userInfo przed wysłaniem na backend
    const { email, ...userInfoWithoutEmail } = userInfo;

    try {
      const response = await fetch('http://localhost:8080/user-info/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userInfoWithoutEmail)
      });

      if (!response.ok) {
        throw new Error('Failed to update user information');
      }

      setIsEditing(false);
      fetchUserData(); // Refresh the data
    } catch (error) {
      console.error('Error updating user information:', error);
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
      {isEditing ? (
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
            
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <div class="display-user-info">
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Surname:</strong> {userInfo.surname}</p>
            <p><strong>Mobile Number:</strong> {userInfo.mobileNumber}</p>
            <p><strong>Address:</strong> {userInfo.address}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}

      <h2>Orders</h2>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Date:</strong> {new Date(order.dateTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Service:</strong> {order.service}</p>
              <h3>Products:</h3>
              <ul>
                {order.orderProducts.map(product => (
                  <li key={product.id}>
                    <p><strong>Product Name:</strong> {product.product.name}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Price:</strong> ${product.product.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default UserInfo;
