import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Teacher from "./teacher.component";
import "./style/teacherContainer.style.css";
import AddTeacher from "./addTeacher.component";
import Search from "../search/search.component";

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
  const [classRooms, setClassRooms] = useState([]);
  const [searchedTeachers, setSearchedTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    position: "",
    isAbsent: "-1",
    subject: "",
    id: "",
  });
  const teachersRef = collection(db, "teacher");
  const classRoomRef = collection(db, "classRoom");

  useEffect(() => {
    setLoading(true);
    getDocs(teachersRef)
      .then((data) => {
        setTeachers((prev) =>
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        if (!searchedTeachers.length) {
          setSearchedTeachers((prev) =>
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
    getDocs(classRoomRef)
      .then((classRoomData) => {
        setClassRooms((prev) =>
          classRoomData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
    //eslint-disable-nex-line
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onSearchInputChange = (name) => {
    let tempSearchedTeachers = teachers.filter((teacher) =>
      `${teacher.firstName} ${teacher.lastName}`
        .toLowerCase()
        .includes(name.toLowerCase())
    );
    setSearchedTeachers((prev) => tempSearchedTeachers);
  };
  const addTeacher = async () => {
    const tempTeacher = { ...teacher };
    tempTeacher.id = uuidv4();
    setTeachers((prev) => [...teachers, tempTeacher]);
    if (searchedTeachers.length === teachers.length) {
      setSearchedTeachers((prev) => [...teachers, tempTeacher]);
    }
    await setDoc(doc(db, "teacher", tempTeacher.id), tempTeacher);
  };
  /**
   *
   * @param {*} name name on the input field or select field
   * @param {*} value the input of the user
   */
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
      assignToClass: false,
      isAbsent: false,
      id: "",
    });
  };
  const deleteTeacher = async (id) => {
    try {
      let teacher = teachers.find((teacher) => teacher.id === id);
      let teacherClassRoom = classRooms.find(
        (classRoom) => classRoom.homeRoomTeacherId === teacher.id
      );
      teacherClassRoom.homeRoomTeacherId = "";
      await updateDoc(
        doc(db, "classRoom", teacherClassRoom.id),
        teacherClassRoom
      );
      let tempTeachers = [...teachers];
      tempTeachers = tempTeachers.filter((teacher) => teacher.id !== id);
      setTeachers((prev) => tempTeachers);
      if (searchedTeachers.length === teachers.length) {
        setSearchedTeachers((prev) => tempTeachers);
      }
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
      if (searchedTeachers.length === teachers.length) {
        setSearchedTeachers(TempTeachers);
      }
      await updateDoc(doc(db, "teacher", teacherData.id), teacherData);
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
      <div className="search">
        <Search onChange={onSearchInputChange} />
      </div>
      <div className="teachers">
        {!loading
          ? searchedTeachers.map((teacher) => {
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
