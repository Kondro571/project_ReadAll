import React, { useState, useEffect } from 'react';
import { getAuthToken } from "../../services/BackendService";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({

    orderSubmit: {
      maxWidth: 800,
      margin: '0 auto',
      padding: 20,
      paddingTop: 130,
      border: '1px solid #555',
      borderRadius: 8,
      backgroundColor: '#f5f3f2',
      color: '#F2F2F2',
      '@media (max-width: 768px)': {
        paddingTop: 130,
      },
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: '1.8em',
      color: '#F96D00',
      '@media (max-width: 480px)': {
        fontSize: '1.5em',
      },
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 15,
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: 5,
      fontWeight: 'bold',
      color: 'black',
    },
    input: {
      padding: 10,
      border: '1px solid #ccc',
      borderRadius: 4,
      backgroundColor: '#EEEEEE',
      color: '#393E46',
      fontSize: '1em',
      '&:focus': {
        borderColor: '#F96D00',
        outline: 'none',
      },
    },
    buttonSubmit: {
      gridColumn: 'span 2',
      marginTop: 20,
      padding: 12,
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      backgroundColor: '#F96D00',
      color: '#F2F2F2',
      fontWeight: 'bold',
      fontSize: '1em',
      textTransform: 'uppercase',
      '&:hover': {
        backgroundColor: '#FF8C33',
      },
      '@media (max-width: 768px)': {
        gridColumn: 'span 1',
      },
    },
    buttonCancel: {
      marginTop: 10,
      padding: 12,
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      backgroundColor: '#6c757d',
      color: '#F2F2F2',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#565e64',
      },
    },
    error: {
      color: '#FF4E50',
      fontSize: '0.9em',
      marginTop: -10,
      textAlign: 'center',
    },
  });
  


const Order = () => {
  const classes = useStyles();

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
  const [formError, setFormError] = useState(''); // Stan dla błędów formularza

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const isFormValid = () => {
    const { name, surname, mobileNumber, address } = userInfo;
    if (!name || !surname || !mobileNumber || !address || !service) {
      setFormError('All fields must be filled');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
  
    if (!isFormValid()) {
      return;
    }
  
    const token = getAuthToken();
  
    const { email, ...userInfoWithoutEmail } = userInfo;
  
    try {
      // Update user info
      const userInfoResponse = await fetch('http://localhost:8080/profile', {
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
  
      const responseData = await orderResponse.json();
  
      if (responseData.redirectUri) {
        // Przekierowanie na `redirectUri`
        window.location.href = responseData.redirectUri;
      } else {
        throw new Error('No redirect URI provided');
      }
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
    <div className={classes.orderSubmit}>
      <h2 className={classes.header}>Order Proceed</h2>
      {formError && <p className={classes.error}>{formError}</p>}
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <div className={classes.formGroup}>
          <label className={classes.label}>Email:</label>
          <input type="email" name="email" value={userInfo.email} readOnly className={classes.input} />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Name:</label>
          <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} className={classes.input} />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Surname:</label>
          <input type="text" name="surname" value={userInfo.surname} onChange={handleInputChange} className={classes.input} />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Mobile Number:</label>
          <input type="text" name="mobileNumber" value={userInfo.mobileNumber} onChange={handleInputChange} className={classes.input} />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Address:</label>
          <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} className={classes.input} />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Service:</label>
          <select value={service} onChange={e => setService(e.target.value)} className={classes.input}>
            <option value="">Select a service</option>
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
          </select>
        </div>
        <button type="submit" className={classes.buttonSubmit}>Submit Order</button>
      </form>
    </div>
  );
};

export default Order;
