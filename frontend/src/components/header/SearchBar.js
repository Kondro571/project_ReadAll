
import React from 'react';
// import searcgImage from "./../../images/header/search.png";

import "./css/searchBar.css"

function SearchBar() {
    return (

        <div className="search-bar">
            {/* <img src={searcgImage} alt="Search" /> */}
            <input type="text" placeholder="search" />
        </div>
    );
}

export default SearchBar;









