import React from 'react';
import './search.style.css';


const Search = ({onChange})=>{
const onInputChange=(e)=>{
    onChange(e.target.value);
}
return (
    <div className="search">
        <input type="text" placeholder='name' onChange={onInputChange}/>
    </div>
)
}
export default Search;