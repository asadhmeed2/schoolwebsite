import React from 'react';
import './student.style.css'


const Student = ({firstName, lastName,age,grade,id})=>{
    const [student, setStudent] = React.useState({
      firstName: firstName,
      lastName: lastName,
      age: age,
      grade: grade,
      id: id,
    });
return (
  <div className="student">
    <p>{`First name : ${student.firstName}`}</p>
    <p>{`Last name : ${student.lastName}`}</p>
    <p>{`Age : ${student.age}`}</p>
    <p>{`Grade : ${student.grade}`}</p>
  </div>
);
}

export default Student;