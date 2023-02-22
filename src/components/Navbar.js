import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
   const {searchTerm, setSearchTerm, useSearchBar, setUseSearchBar} = props;

    return(
        <nav>
            <Link to={"/"} id="homeBttn" onClick={() => {
                setUseSearchBar(true);
                setSearchTerm("")
            }}>HOME</Link>

            <input 
            type="text" 
            placeholder="Search puppy name" 
            value={searchTerm}
            className= {useSearchBar ? "searchOn" : "searchOff"}
            onChange={(event) => {
                setSearchTerm(event.target.value);
            }}
            ></input>
        </nav>
    )
}

export default Navbar;