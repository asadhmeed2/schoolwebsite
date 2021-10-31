import React, { useRef } from "react";
import "./addTeacher.style.css";
const AddTeacher = ({ onChange, onSubmit, onClear }) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const positionRef = useRef();
  const isAbsentRef = useRef();
  const subjectRef = useRef();

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
    phoneNumberRef.current.value = "";
    positionRef.current.value = "";
    isAbsentRef.current.value = "-1";
    subjectRef.current.value ="";
    onClear();
  };

  return (
    <div className="addTeacher">
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
          type="number"
          placeholder={"phone number"}
          ref={phoneNumberRef}
          name={"phoneNumber"}
          id={"phoneNumber"}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"position"}
          ref={positionRef}
          name={"position"}
          id={"position"}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"subject"}
          ref={subjectRef}
          name={"subject"}
          id={"subject"}
          onChange={onInputChange}
        />
        <select
          name="isAbsent"
          ref={isAbsentRef}
          id="isAbsent"
          onChange={onInputChange}
        >
          <option value={"-1"} disabled selected="true">
            Chose an option
          </option>
          <option value={true}>Absent</option>
          <option value={false}>Not Absent</option>
        </select>
        <input type="submit" value={"Add"} />
        <input type="button" value={"Clear"} onClick={onClearClick} />
      </form>
    </div>
  );
};
export default AddTeacher;
