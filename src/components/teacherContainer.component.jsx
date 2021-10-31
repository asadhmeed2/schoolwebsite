import React, { useState, useEffect } from "react";
import db from "../firebase";
import { v4 as uuidv4 } from "uuid";
import Teacher from "./teacher.component";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import AddTeacher from "./addTeacher.component";

import "./classRoom.style.css";

const StudentContainer = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    position: "",
    isAbsent: false,
    id: "",
  });
  const teachersRef = collection(db, "teacher");

  useEffect(async () => {
    setLoading(true);
    const data = await getDocs(teachersRef);
    setTeachers((prev) =>
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoading(false);
  }, []);
  const addTeacher = async () => {
    const tempTeacher = { ...teacher };
    tempTeacher.id = uuidv4();
    setTeachers((prev) => [...teachers, tempTeacher]);
    const res = await setDoc(doc(db, "teacher", tempTeacher.id), tempTeacher);
    console.log(res);
  };
  const onInputChange = (name, value) => {
    const tempTeacher = { ...teacher };
    tempTeacher[name] = value;
    setTeacher(tempTeacher);
  };
  const clearTeacherData = () => {
    setTeacher({
      firstName: "",
      lastName: "",
      phoneNumber: 0,
      position: "",
      subject:"",
      isAbsent: false,
      id: "",
    });
  };
  const deleteTeacher =async(id)=>{
      let tempTeachers =[...teachers];
      tempTeachers=tempTeachers.filter((teacher)=>teacher.id !== id);
      setTeachers(prev => tempTeachers);
   await deleteDoc(doc(db,"teacher",id));
  } 
  return (
    <div className="studentContainer">
      <AddTeacher
        onSubmit={addTeacher}
        onChange={onInputChange}
        onClear={clearTeacherData}
        edit={false}
      />
      {console.log(teachers)}
      {!loading
        ? teachers.map((teacher) => {
            return (
              <Teacher
                key={teacher.id}
                firstName={teacher.firstName}
                lastName={teacher.lastName}
                phoneNumber={teacher.phoneNumber}
                position={teacher.position}
                subject={teacher.subject}
                isAbsent={teacher.isAbsent}
                id={teacher.id}
                onDelete={deleteTeacher}
              />
            );
          })
        : "loading..."}
    </div>
  );
};

export default StudentContainer;
