import React from 'react';

import basketImage from "./../../images/header/basket.png";
import accountImage from "./../../images/header/account.png";

import "./css/userBasket.css"
function UserMenu() {
    return (
        <div className="top-bar">
                <div className="-basket">

                    <a href="Basket">
                        <img src={basketImage} alt="basket" height="50" />
                    </a>

                </div>
                <div className="user-menu">

                    <a href="login">
                        <img src={accountImage} alt="account" height="50" />
                    </a>
                    {/* <a href="#" className="conto-btn btn1">Admin staf</a> */}
                    {/* <a href="#" className="conto-btn btn2">Log out</a> */}
                </div>
        </div>
    );
}

export default UserMenu;
