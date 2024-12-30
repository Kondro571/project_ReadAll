import React, { useState, useEffect } from 'react';
import { getAuthToken } from "../../services/BackendService";
import { createUseStyles } from 'react-jss';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = createUseStyles({
  userInfo: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    paddingTop: "130px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    color:"black",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    "& div": {
      display: "flex",
      flexDirection: "column",
    },
    "& label": {
      marginBottom: "5px",
      fontWeight: "bold",
    },
    "& input": {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    "& button": {
      marginTop: "10px",
      padding: "10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    "& button[type='submit']": {
      backgroundColor: "#4CAF50",
      color: "white",
    },
    "& button[type='button']": {
      backgroundColor: "#f44336",
      color: "white",
    },
  },
  displayUserInfo: {
    "& p": {
      margin: "10px 0",
    },
    "& button": {
      backgroundColor: "#555555",
      color: "white",
      padding: "10px 20px",
      borderRadius: "15px",
      cursor: "pointer",
    },
  },
  ordersList: {
    listStyleType: "none",
    padding: "0",
  },
  orderItem: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    "& p": {
      margin: "5px 0",
    },
    "& ul": {
      listStyleType: "none",
      padding: "0",
    },
    "& ul li": {
      margin: "5px 0",
    },
  },

  formContainer: {
    backgroundColor: "#393E46",
    color: "#F2F2F2",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    "& div": {
      display: "flex",
      flexDirection: "column",
    },
    "& buttonsContainer": {
      display: "block",
    },
    "& label": {
      fontWeight: "bold",
      marginBottom: "5px",
      textAlign: "left",
    },
    "& input, & textarea, & select": {
      width: "90%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#F2F2F2",
      color: "#393E46",
      fontSize: "1em",
    },
  },
  
  buttonsContainer: {
    width: "94%",


    gap: "10px", 
    marginTop: "20px",
    "& button": {
      padding: "10px 20px",
      fontSize: "1em",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    "& button[type='submit']": {
      backgroundColor: "#F96D00",
      color: "#F2F2F2",
      "&:hover": {
        backgroundColor: "#ff8c33",
      },
    },
    "& button[type='button']": {
      backgroundColor: "#6c757d",
      color: "#F2F2F2",
      "&:hover": {
        backgroundColor: "#565e64",
      },
    },
  },
  
});


function UserInfo() {
  const classes = useStyles();
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

      const userInfoResponse = await fetch('http://localhost:8080/profile', {
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
    const { email, ...userInfoWithoutEmail } = userInfo;

    try {
      const response = await fetch('http://localhost:8080/profile', {
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

  const retryPayment = (order) => {
    const token = getAuthToken();
    fetch(`http://localhost:8080/orders/${order.id}/retry-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to retry payment.');
        }
        return response.text();
      })
      .then((redirectUri) => {
        toast.info('Redirecting to payment...');
        window.location.href = redirectUri;
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.userInfo}>
      <h2 className={classes.header}>User Information</h2>
      {isEditing ? (
        <form className={classes.formContainer} onSubmit={handleFormSubmit}>
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
          <div className={classes.buttonsContainer}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className={classes.displayUserInfo}>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Surname:</strong> {userInfo.surname}</p>
          <p><strong>Mobile Number:</strong> {userInfo.mobileNumber}</p>
          <p><strong>Address:</strong> {userInfo.address}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}

      <h2 className={classes.header}>Orders</h2>
      {orders.length > 0 ? (
        <ul className={classes.ordersList}>
          {orders.map(order => (
            <li key={order.id} className={classes.orderItem}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Date:</strong> {new Date(order.dateTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Service:</strong> {order.service}</p>
              {order.status !== "PAID" && (
                <button onClick={() => retryPayment(order)} className={classes.button}>
                  Retry Payment
                </button>
              )}
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
