import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from "./../../images/header/logo.png";

const useStyles = createUseStyles({
  logoLogin: {
    margin: "0 auto",
    borderBottom: "medium solid black",
    width: "90%",
    marginLeft: "50px",
    textAlign: "left",
    backgroundColor: "white",
    "& img": {
      height: "90px",
    },
    "@media (max-width: 768px)": {
      width: "100%",
      margin: "0px",
    },
  },
  loginContainer: {
    backgroundColor: "white",
    width: "300px",
    textAlign: "center",
    margin: "70px auto 0",
    height: "500px",
  },
  resetPasswordContainer: {
    backgroundColor: "white",
    width: "300px",
    textAlign: "center",
    margin: "70px auto 0",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#3C2F2F",
    textAlign: "center",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontFamily: "Imprima",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    fontSize: "17px",
    height: "45px",
    padding: "5px",
    margin: "10px 30px",
    borderRadius: "5px",
    background: "#FFF",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },
  submitButton: {
    height: "40px",
    borderRadius: "5px",
    margin: "10px 30px",
    border: "none",
    fontSize: "16px",
    background: "rgba(217,217,217)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      background: "rgb(78, 78, 78)",
      color: "white",
      cursor: "pointer",
    },
  },
  errorMessage: {
    color: "red",
    fontSize: "16px",
    textAlign: "center",
    marginTop: "20px",
  },
});

function ResetPassword() {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    fetch('http://localhost:8080/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token }),
    })
      .then((response) => response.ok)
      .then((valid) => setIsValid(valid))
      .catch(() => setIsValid(false));
  }, [token]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token, newPassword }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Password reset successfully.');
        } else {
          toast.error('Error resetting password.');
        }
      })
      .catch(() => toast.error('An error occurred.'));
  };

  if (!isValid) {
    return <p className={classes.errorMessage}>Invalid or expired token.</p>;
  }

  return (
    <>
      <div className={classes.logoLogin}>
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <div className={classes.resetPasswordContainer}>
        <h1 className={classes.heading}>Reset Password</h1>
        <form className={classes.form} onSubmit={handleResetPassword}>
          <input
            className={classes.input}
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className={classes.submitButton}>
            Reset Password
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default ResetPassword;
