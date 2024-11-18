import React from 'react';
import { createUseStyles } from 'react-jss';
import logoImage from './../../images/header/logo.png';

// Tworzymy style za pomocą react-jss
const useStyles = createUseStyles({
  logo: {
    marginLeft: 35,
    '& img': {
      height: 70,
    },
  },
  '@media only screen and (max-width: 705px)': {
    logo: {
      '& img': {
        display: 'none',
      },
      marginLeft: 'auto',
    },
  },
});

function Logo() {
  const classes = useStyles(); // Hook do używania stylów

  return (
    <div className={classes.logo}>
      <a href="/">
        <img src={logoImage} alt="Logo" />
      </a>
    </div>
  );
}

export default Logo;
