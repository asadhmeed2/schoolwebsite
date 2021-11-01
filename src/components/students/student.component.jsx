import React from "react";
import AddStudent from "./addStudent.component";

import "./styles/student.style.css";

const Student = ({
  firstName,
  lastName,
  age,
  grade,
  id,
  assignToClass,
  onDelete,
  onUpdate,
}) => {
  const [student, setStudent] = React.useState({
    firstName: firstName,
    lastName: lastName,
    assignToClass: assignToClass,
    age: age,
    grade: grade,
    id: id,
  });
  const [edit, setEdit] = React.useState(false);

  const onInputChange = (name, value) => {
    const tempStudent = { ...student };
    tempStudent[name] = value;
    setStudent(tempStudent);
  };
  const clearStudentData = () => {
    setStudent(student);
  };
  const deleteStudent = () => {
    onDelete(student.id);
  };

  const updateStudentON = () => {
    setEdit(true);
  };
  const updateStudent = () => {
    setEdit(false);
    onUpdate(student);
  };
  const onCancelEdit = () => {
    setEdit(false);
  }
  return (
    <div className="student">
       {!edit ? (<>
      <p>{`First name : ${student.firstName}`}</p>
      <p>{`Last name : ${student.lastName}`}</p>
      <p>{`Age : ${student.age}`}</p>
      <p>{`Grade : ${student.grade}`}</p>
      <p>{`assignToClass : ${student.assignToClass}`}</p>
      <input type="button" onClick={deleteStudent} value={"delete"} />
        <input type="button" onClick={updateStudentON} value={"edit"} />
        </>
      ) : (
        <AddStudent
          onSubmit={updateStudent}
          onChange={onInputChange}
          onClear={clearStudentData}
          edit={{ edit: edit, student: student, onCancel: onCancelEdit }}
        />
      )}
    </div>
  );
};

export default Student;
