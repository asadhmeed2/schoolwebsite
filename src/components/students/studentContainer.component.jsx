import React, { useState, useEffect } from "react";
import db from "../../firebase";
import "./styles/studentContainer.style.css";
import { v4 as uuidv4 } from "uuid";
import Student from "./student.component";
import Search from "../search/search.component";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import AddStudent from "./addStudent.component";

const StudentContainer = () => {
  const [students, setStudents] = useState([]);
  const [searchedStudents,setSearchedStudents] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    age: "",
    assignToClass: false,
    grade: "",
    id: "",
  });
  const studentsRef = collection(db, "student");
  const classRoomRef = collection(db, "classRoom");

  // const getData =async()=>{
  //   setLoading(true);
  //   const data = await getDocs(studentsRef);
  //   const classRoomData = await getDocs(classRoomRef);
  //   setStudents((prev) =>
  //     data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   );
  //   setSearchedStudents((prev) =>
  //     data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   );
  //   setClassRooms((prev) =>
  //     classRoomData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   );
  //   setLoading(false);
  // }
  useEffect(() => {
    setLoading(true);
    getDocs(studentsRef).then((data) => {
      setStudents((prev) =>
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      if (!searchedStudents.length) {
        setSearchedStudents((prev) =>
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    });
    getDocs(classRoomRef).then((classRoomData) => {
      setClassRooms((prev) =>
        classRoomData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    setLoading(false);
  }, [studentsRef, classRoomRef]);

  const onSearchInputChange=(name)=>{
    let tempSearchedStudents= students.filter((student)=>`${student.firstName} ${student.lastName}`.toLowerCase().includes(name.toLowerCase()))
    setSearchedStudents((prev) => tempSearchedStudents);
  }
  const addStudent = async () => {
    const tempStudent = { ...student };
    tempStudent.id = uuidv4();
    setStudents((prev) => [...students, tempStudent]);
    if (students.length === searchedStudents.length) {
      setSearchedStudents((prev) => [...searchedStudents, tempStudent]);
    }
     await setDoc(doc(db, "student", tempStudent.id), tempStudent);
  };
  /**
   *
   * @param {*} name name on the input field or select field
   * @param {*} value the input of the user
   */
  const onInputChange = (name, value) => {
    const tempStudent = { ...student };
    tempStudent[name] = value;
    setStudent(tempStudent);
  };
  const clearStudentData = () => {
    setStudent({
      firstName: "",
      lastName: "",
      assignToClass: false,
      age: "",
      grade: "",
      id: "",
    });
  };
  const deleteStudent = async (id) => {
    let student = students.find((student) => student.id === id);
    let studentGradeClassRooms = classRooms.filter(
      (classRoom) => classRoom.grade === student.grade
    );
    let studentPosition = [];
    studentGradeClassRooms = studentGradeClassRooms.filter((classRoom) => {
      for (let i = 1; i <= 10; i++) {
        if (classRoom[`student${i}Id`] === student.id) {
          studentPosition = [...studentPosition, i];
          return true;
        }
      }
      return false;
    });
    if (studentGradeClassRooms.length > 0) {
      studentGradeClassRooms.map(async (classRoom, i) => {
        let tempClassRoom = { ...classRoom };
        tempClassRoom[`student${studentPosition[i]}Id`] = "";
        await updateDoc(doc(db, "classRoom", tempClassRoom.id), tempClassRoom);
      });
    }
    let tempStudents = [...students];
    tempStudents = tempStudents.filter((student) => student.id !== id);
    setStudents((prev) => tempStudents);
    if(students.length===searchedStudents.length){
      setSearchedStudents((prev) => tempStudents);
    }
    await deleteDoc(doc(db, "student", id));
  };
  const updateStudent = async (studentData) => {
    try {
      let TempStudents = students.map((student) => {
        if (student.id === studentData.id) return studentData;
        return student;
      });
       
      setStudents(TempStudents);
      if (students.length === searchedStudents.length) {
        setSearchedStudents((prev) => TempStudents);
      }
      await updateDoc(doc(db, "student", studentData.id), studentData);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="studentContainer">
      <AddStudent
        onSubmit={addStudent}
        onChange={onInputChange}
        onClear={clearStudentData}
        edit={{
          edit: false,
          student: student,
          cancelEdit: () => {},
        }}
      />
      <div className="search">
        <Search onChange={onSearchInputChange} />
      </div>
      <div className="students">
        {!loading
          ? searchedStudents.map((student) => {
              return (
                <Student
                  key={student.id}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  age={student.age}
                  assignToClass={student.assignToClass}
                  grade={student.grade}
                  id={student.id}
                  onDelete={deleteStudent}
                  onUpdate={updateStudent}
                />
              );
            })
          : "loading..."}
      </div>
    </div>
  );
};

export default StudentContainer;
