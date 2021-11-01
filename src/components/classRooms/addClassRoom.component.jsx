import React from "react";
import "./style/addClassRoom.style.css";

const addClassRoom = ({ onChange, onSubmit }) => {
  const onFormSubmit = (e) => {
        e.preventDefault();
    onSubmit();
  };
const  onInputChange = (e) => {
  
    onChange(e.target.name,e.target.value);
}

  return (
    <div className="addClassRoom">
      <form action="" onSubmit={onFormSubmit}>
        <input type="text" name="grade" placeholder={"grade"} onChange={onInputChange} />
        <input type="text" name="number" placeholder={"number"} onChange={onInputChange} />
        <input type="submit" value="Add" />
        <input type="button" value="hide" />
      </form>
    </div>
  );
};
export default addClassRoom;
