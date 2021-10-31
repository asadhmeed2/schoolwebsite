import React from "react";
import './teacher.style.css'
const Teacher = ({firstName, lastName, email,phoneNumber,subject,position,isAbsent,id}) => {
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
  return <div className="teacher"></div>;
};

export default Teacher;
