import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import logoImage from "./../../images/header/logo.png";
import User from '../../models/userRegisterModel';

const useStyles = createUseStyles({
  logoLogin: {
    margin: "0 auto",
    borderBottom: "medium solid black",
    width: "90%",
    marginLeft: "50px",
    textAlign: "left",
    "& img": {
      height: "90px",
    },
  },
  loginContainer: {
    backgroundColor: "white",
    width: "300px",
    textAlign: "center",
    margin: "70px auto 0",
    height: "550px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
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
  },
  input: {
    fontSize: "17px",
    height: "55px",
    padding: "5px",
    margin: "10px 30px",
    borderRadius: "2px",
    background: "#FFF",
    border: "none",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  },
  confirmButton: {
    height: "35px",
    borderRadius: "2px",
    margin: "10px 30px",
    border: "none",
    fontSize: "18px",
    background: "rgba(217,217,217)",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      background: "rgb(78, 78, 78)",
      color: "white",
      cursor: "pointer",
    },
  },
  messages: {
    color: "red",
    marginBottom: "10px",
  },
  loginReturn: {
    fontSize: "15px",
    "& a": {
      color: "#000",
      marginLeft: "5px",
      textDecoration: "underline",
    },
  },
});

function RegistrationForm({ messages }) {
  const classes = useStyles();
  const [user, setUser] = useState(new User('', ''));
  const [repeatPassword, setRepeatPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'repeatPassword') {
      setRepeatPassword(value);
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistrationError(null);
    setPasswordError(null);

    if (user.password !== repeatPassword) {
      setPasswordError('Passwords are different.');
      return;
    }

    if (user.password.length < 8) {
      setPasswordError('Minimum password length must be 8 characters.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setRegistrationError(errorData.message);
        return;
      }

      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.error('Error registering:', error);
      setRegistrationError('Error. Try later.');
    }
  };

  return (
    <>
      <div className={classes.logoLogin}>
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <div className={classes.loginContainer}>
        <h1 className={classes.heading}>Registration</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.messages}>
            {registrationError && <span>{registrationError}</span>}
            {passwordError && <span>{passwordError}</span>}
          </div>
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            className={classes.input}
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <input
            className={classes.input}
            type="password"
            placeholder="Repeat password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className={classes.confirmButton}>
            Create account
          </button>
          <div className={classes.loginReturn}>
            Do you have an account?
            <a href="login">Log in</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
