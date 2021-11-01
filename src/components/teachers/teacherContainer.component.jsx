import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Teacher from "./teacher.component";
import "./style/teacherContainer.style.css";
import AddTeacher from "./addTeacher.component";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";



const StudentContainer = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    position: "",
    isAbsent: "-1",
    subject:"",
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
      subject: "",
      assignToClass:false,
      isAbsent: false,
      id: "",
    });
  };
  const deleteTeacher = async (id) => {
    try {
      let tempTeachers = [...teachers];
      tempTeachers = tempTeachers.filter((teacher) => teacher.id !== id);
      setTeachers((prev) => tempTeachers);
      await deleteDoc(doc(db, "teacher", id));
    } catch (e) {
      console.error(e);
    }
  };

  const updateTeacher = async (teacherData) => {
    try {
      let TempTeachers = teachers.map((teacher) => {
        if (teacher.id === teacherData.id) return teacherData;
        return teacher;
      });
      setTeachers(TempTeachers);
     let res=await updateDoc(doc(db, "teacher", teacherData.id), teacherData);
     console.log("respons ",res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="teacherContainer">
      <AddTeacher
        onSubmit={addTeacher}
        onChange={onInputChange}
        onClear={clearTeacherData}
        edit={{ edit: false, teacher: teacher, cancelEdit: () => {} }}
      />
      {console.log(teachers)}
      <div className="teachers">
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
                  assignToClass={teacher.assignToClass ? "true" : "false"}
                  id={teacher.id}
                  onDelete={deleteTeacher}
                  onUpdate={updateTeacher}
                />
              );
            })
          : "loading..."}
      </div>
    </div>
  );
};

export default StudentContainer;
