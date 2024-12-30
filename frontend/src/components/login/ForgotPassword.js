import React, { useState } from 'react';
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
  forgotPasswordContainer: {
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
});

function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Reset link sent to your email.');
        } else {
          toast.error('Error sending reset link.');
        }
      })
      .catch(() => toast.error('An error occurred.'));
  };

  return (
    <>
      <div className={classes.logoLogin}>
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <div className={classes.forgotPasswordContainer}>
        <h1 className={classes.heading}>Forgot Password</h1>
        <form className={classes.form} onSubmit={handleForgotPassword}>
          <input
            className={classes.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={classes.submitButton}>
            Send Reset Link
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default ForgotPassword;
