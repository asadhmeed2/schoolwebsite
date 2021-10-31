import React, { useRef } from "react";
import "./addTeacher.style.css"
const AddTeacher = ({ onChange, onSubmit, onClear }) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const gradeRef = useRef();
  const ageRef = useRef();
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  const onInputChange = (e) => {
    onChange(e.target.name, e.target.value);
  };
  const onClearClick = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    gradeRef.current.value = "";
    ageRef.current.value = "";
    onClear();
  };

  return (
    <div className="addStudent">
      <form action="" onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder={"first name"}
          ref={firstNameRef}
          name={"firstName"}
          id={"firstName"}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"last name"}
          ref={lastNameRef}
          name={"lastName"}
          id={"lastName"}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"grade"}
          ref={gradeRef}
          name={"grade"}
          id={"grade"}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"age"}
          ref={ageRef}
          name={"age"}
          id={"age"}
          onChange={onInputChange}
        />
        <input type="submit" value={"Add"} />
        <input type="button" value={"Clear"} onClick={onClearClick} />
      </form>
    </div>
  );
};
export default AddTeacher;
