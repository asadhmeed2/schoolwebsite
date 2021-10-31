import React from "react";
import "./teacher.style.css";
const Teacher = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  subject,
  position,
  isAbsent,
  id,
  onDelete,
}) => {
  const [teacher, setTeacher] = React.useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    subject: subject,
    position: position,
    isAbsent: isAbsent,
    id: id,
  });
  const onDeleteButtonClick =()=>{
    onDelete(teacher.id);
  }
  return (
    <div className="teacher">
      <h3>Name : {`${teacher.firstName} ${teacher.lastName}`}</h3>
      <h4>Position : {teacher.position}</h4>
      <h4>Number : {teacher.phoneNumber}</h4>
      <h4>Subject : {teacher.subject}</h4>
      <input type="button" value={"delete"} onClick={onDeleteButtonClick}/>
    </div>
  );
};

export default Teacher;
