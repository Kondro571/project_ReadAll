import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { ToastContainer, toast } from 'react-toastify';
import { getAuthToken } from "../../services/BackendService";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom'; 

const useStyles = createUseStyles({
  container: {
    width: '80%',
    margin: ' auto',
    textAlign: 'center',
    paddingTop: 130,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f4f4f4',
    color: 'black',
    border: '1px solid #ddd',
    padding: '8px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  button: {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  
});
const customToastContainer = {
  position: "top-center", // Pozycja na dole, na środku
  autoClose: 5000, // Czas wyświetlania powiadomienia (5 sekund)
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  limit: 1, // Możesz ograniczyć liczbę powiadomień
  style: {
    marginBottom: '25px', // Ustawienie odstępu pomiędzy powiadomieniami
    padding: '10px', // Ustawienie paddingu dla samego powiadomienia
    paddingTop: '130px', // Ustawienie
  },
};
function CheckOrder() {
  const classes = useStyles();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const { orderId } = useParams();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      toast.error('JWT token not found');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/orders/my-order/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch order.');
        }
        return response.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);

        verifyPayment(orderId, token);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, [orderId]);

  const verifyPayment = (orderId, token) => {
    fetch(`http://localhost:8080/orders/verify-payment/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.text())
      .then((result) => {
        if (result === "Order has been paid successfully") {
          toast.success(result);
          setPaymentVerified(true);
          setOrder((prevOrder) => ({ ...prevOrder, status: "PAID" }));
        } else {
          toast.error(result);
        }
      })
      .catch(() => {
        toast.error('Error verifying payment.');
      });
  };

  const retryPayment = () => {
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
    return <p>Loading order...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className={classes.container}>
      <h1>Order Details</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Order ID</th>
            <th className={classes.th}>Total</th>
            <th className={classes.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.td}>{order.id}</td>
            <td className={classes.td}>{order.totalAmount}</td>
            <td className={classes.td}>{order.status}</td>
          </tr>
        </tbody>
      </table>
      {!paymentVerified && order.status !== "PAID" && (
        <button onClick={retryPayment} className={classes.button}>
          Retry Payment
        </button>
      )}
   <ToastContainer {...customToastContainer} /> 
  </div>
  );
}

export default CheckOrder;

