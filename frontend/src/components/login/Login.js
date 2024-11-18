import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import logoImage from "./../../images/header/logo.png";
import { setAuthHeader } from "../../services/BackendService";

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
    height: "500px",
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
  link: {
    color: "#000",
    fontSize: "15px",
    margin: "3px",
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
  createAccountButton: {
    width: "250px",
    height: "35px",
    borderRadius: "2px",
    margin: "10px 30px",
    background: "#000",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#3C2F2F",
      color: "white",
    },
  },
});

function LoginForm() {
  setAuthHeader(null);
  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: login, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          setAuthHeader(data["token"]);
          window.location.href = "http://localhost:3000";
        } else {
          setAuthHeader(null);
          setErrorMessage("Wrong email or password");
        }
      })
      .catch(() => {
        setErrorMessage("Error. Try later");
      });
  };

  return (
    <>
      <div className={classes.logoLogin}>
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <div className={classes.loginContainer}>
        <h1 className={classes.heading}>Login</h1>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className="messages">
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            className={classes.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={classes.confirmButton}>
            Login
          </button>
          <a href="login" className={classes.link}>
            Forget password?
          </a>
          <a href="registration" className={classes.createAccountButton}>
            Create new account
          </a>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
