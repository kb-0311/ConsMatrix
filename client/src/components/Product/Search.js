import React, { Fragment, useState } from 'react'
import Metadata from '../../component/layout/Metadata'
import './Search.css'
const Search = ({history}) => {
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        
            history.push(`/products/${keyword}`);

        
        
    }
  return (
    <Fragment>
        <Metadata title="Search A Utility" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                type="text"
                placeholder="Search a Utility ..."
                onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
    </Fragment>
  )
}

export default Search