import React, { useState } from "react";
import "./style/teacher.style.css";
import AddTeacher from "./addTeacher.component";
const Teacher = ({
  firstName,
  lastName,
  phoneNumber,
  subject,
  position,
  isAbsent,
  assignToClass,
  id,
  onDelete,
  onUpdate,
}) => {
  const [teacher, setTeacher] = useState({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    subject: subject,
    position: position,
    assignToClass: assignToClass,
    isAbsent: isAbsent,
    id: id,
  });

  const [edit, setEdit] = useState(false);
  /**
   *
   * @param {*} name name on the input field or select field
   * @param {*} value the input of the user
   */
  const onInputChange = (name, value) => {
    const tempteacher = { ...teacher };
    tempteacher[name] = value;
    setTeacher(tempteacher);
  };
  const clearTeacherData = () => {
    setTeacher(teacher);
  };
  const onDeleteButtonClick = () => {
    onDelete(teacher.id);
  };
  const updateTeacherON = () => {
    setEdit(true);
  };
  const updateTeacher = () => {
    setEdit(false);
    onUpdate(teacher);
  };
  const onCancelEdit = () => {
    setEdit(false);
  };
  return (
    <div className="teacher">
      {!edit ? (
        <>
          <p>Name : {`${teacher.firstName} ${teacher.lastName}`}</p>
          <p>Position : {teacher.position}</p>
          <p>Number : {teacher.phoneNumber}</p>
          <p>Subject : {teacher.subject}</p>
          <p>assign To Class : {teacher.assignToClass}</p>

          <input
            type="button"
            className="btn"
            value={"delete"}
            onClick={onDeleteButtonClick}
          />

          <input
            type="button"
            className="btn"
            onClick={updateTeacherON}
            value={"edit"}
          />
        </>
      ) : (
        <AddTeacher
          onSubmit={updateTeacher}
          onChange={onInputChange}
          onClear={clearTeacherData}
          edit={{ edit: edit, teacher: teacher, onCancel: onCancelEdit }}
        />
      )}
    </div>
  );
};

export default Teacher;
