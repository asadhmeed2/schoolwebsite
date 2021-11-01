import React, { useRef ,useState} from "react";
import "./style/addTeacher.style.css";
const AddTeacher = ({ onChange, onSubmit, onClear ,edit}) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const positionRef = useRef();
  const isAbsentRef = useRef();
  const subjectRef = useRef();
const [editMode] = useState(edit);
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
          value={edit.teacher.firstName}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"last name"}
          ref={lastNameRef}
          name={"lastName"}
          id={"lastName"}
          value={edit.teacher.lastName}
          onChange={onInputChange}
        />
        <input
          type="number"
          placeholder={"phone number"}
          ref={phoneNumberRef}
          name={"phoneNumber"}
          id={"phoneNumber"}
          value={edit.teacher.phoneNumber}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"position"}
          ref={positionRef}
          name={"position"}
          id={"position"}
          value={edit.teacher.position}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder={"subject"}
          ref={subjectRef}
          name={"subject"}
          id={"subject"}
          value={edit.teacher.subject}
          onChange={onInputChange}
        />
        <select
          name="isAbsent"
          ref={isAbsentRef}
          id="isAbsent"
          value={edit.teacher.isAbsent}
          onChange={onInputChange}
        >
          <option value={"-1"} disabled >
            Chose an option
          </option>
          <option value={true}>Absent</option>
          <option value={false}>Not Absent</option>
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
export default AddTeacher;
