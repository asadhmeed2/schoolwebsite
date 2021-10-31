import React, { useState, useEffect } from "react";
import db from "../firebase";
import { v4 as uuidv4 } from "uuid";
import Teacher from "./teacher.component";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import AddTeacter from "./addTeacher.component";

import "./classRoom.style.css";

const StudentContainer = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    age: "",
    grade: "",
    id: "",
  });
  const studentsRef = collection(db, "student");

  useEffect(async () => {
    setLoading(true);
    const data = await getDocs(studentsRef);
    setStudents((prev) =>
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoading(false);
  }, []);
  const addStudent = async () => {
    const tempStudent = { ...student };
    tempStudent.id = uuidv4();
    setStudents((prev) => [...students, tempStudent]);
    const res = await setDoc(doc(db, "student", tempStudent.id), tempStudent);
    console.log(res);
  };
  const onInputChange = (name, value) => {
    const tempStudent = { ...student };
    tempStudent[name] = value;
    setStudent(tempStudent);
  };
  const clearStudentData = () => {
    setStudent({ firstName: "", lastName: "", age: "", grade: "", id: "" });
  };
  return (
    <div className="studentContainer">
      <AddStudent
        onSubmit={addStudent}
        onChange={onInputChange}
        onClear={clearStudentData}
      />
      {console.log(student)}
      {!loading
        ? students.map((student) => {
            return (
              <Student
                key={student.id}
                firstName={student.firstName}
                lastName={student.lastName}
                age={student.age}
                grade={student.grade}
                id={student.id}
              />
            );
          })
        : "loading..."}
    </div>
  );
};

export default StudentContainer;
