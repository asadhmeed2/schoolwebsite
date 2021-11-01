import React, { useRef, useState, useEffect } from "react";
import "./styles/addStudent.style.css";
const AddStudent = ({ onChange, onSubmit, onClear, edit }) => {
  const [editMode, setEditMode] = useState(edit);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const gradeRef = useRef();
  const ageRef = useRef();
  const assignToClassRef = useRef();

  const onInputChange = (e) => {
    onChange(e.target.name, e.target.value);
  };
  const onClearClick = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    gradeRef.current.value = "";
    ageRef.current.value = "";
    assignToClassRef.current.value = "-1";
    onClear();
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onClearClick();
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
          value={edit.student.firstName}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"last name"}
          ref={lastNameRef}
          name={"lastName"}
          id={"lastName"}
          value={edit.student.lastName}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"age"}
          ref={ageRef}
          name={"age"}
          id={"age"}
          value={edit.student.age}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"grade"}
          ref={gradeRef}
          name={"grade"}
          id={"grade"}
          value={edit.student.grade}
          onChange={onInputChange}
        />

        <select
          name="assignToClass"
          ref={assignToClassRef}
          id="assignToClass"
          value={edit.student.assignToClass}
          onChange={onInputChange}
        >
          <option value={"-1"} disabled >
            Chose an option
          </option>
          <option value={true}>assign To Class</option>
          <option value={false}>Not assign To Class</option>
        </select>
        {editMode.edit ? (
          <>
            <input value="edit" type={"submit"} />
            <input type="button" onClick={editMode.onCancel} value={"Cancel"} />
          </>
        ) : (
          <>
            <input type="submit" value={"Add"} />
            <input type="button" value={"Clear"} onClick={onClearClick} />
          </>
        )}
      </form>
    </div>
  );
};
export default AddStudent;
