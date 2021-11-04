import React from 'react';
import './search.style.css';


const Search = ({onChange})=>{
const onInputChange=(e)=>{
    onChange(e.target.value);
}
return (
    <div className="search">
        <div className="container">
        <h3>Search</h3>
        <input type="text" placeholder='name' onChange={onInputChange}/>
        </div>
    </div>
)
}
export default Search;