import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import ClassRoom from "./classRoom.component";
import "./style/classRoomContainer.style.css";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import AddClassRoom from "./addClassRoom.component";

const ClassRoomContainer = () => {
  const [classRooms, setClassRooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classRoom, setClassRoom] = useState({
    grade: "",
    homeRoomTeacherId: "",
    hasAstudents: false,
    number: 0,
    student1Id: "",
    student2Id: "",
    student3Id: "",
    student4Id: "",
    student5Id: "",
    student6Id: "",
    student7Id: "",
    student8Id: "",
    student9Id: "",
    student10Id: "",
    id: "",
  });
  //references to the data base
  const classRoomRef = collection(db, "classRoom");
  const teacherRef = collection(db, "teacher");
  const studentRef = collection(db, "student");

  //initialize the states and get the data from the server
  const getData = () => {
    setLoading(true);
    getDocs(classRoomRef)
      .then((res) => {
        setClassRooms((prev) =>
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
    getDocs(studentRef)
      .then((res) => {
        setStudents((prev) =>
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
    getDocs(teacherRef)
      .then((res) => {
        setTeachers((prev) =>
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getDocs(classRoomRef)
      .then((res) => {
        setClassRooms((prev) =>
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
    getDocs(studentRef)
      .then((res) => {
        setStudents((prev) =>
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
    getDocs(teacherRef)
      .then((res) => {
        setTeachers((prev) =>
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
    //eslint-disable-nex-line
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  // add a new class room to the data base
  const addClassRoom = async () => {
    const tempClassRoom = { ...classRoom };
    tempClassRoom.id = uuidv4();
    setClassRooms((prev) => [...classRooms, tempClassRoom]);
    await setDoc(doc(db, "classRoom", tempClassRoom.id), tempClassRoom);
  };
  /**
   *
   * @param {*} name name on the input field or select field
   * @param {*} value the input of the user
   */
  const onInputChange = (name, value) => {
    const tempClassRoom = { ...classRoom };
    tempClassRoom[name] = value;
    setClassRoom(tempClassRoom);
  };
  /**
   *
   * @param {*} id id of the class room that will be deleted
   */
  const deleteClassRoom = async (id) => {
    try {
      let tempClassRooms = [...classRooms];
      tempClassRooms = tempClassRooms.filter((teacher) => teacher.id !== id);
      setClassRooms((prev) => tempClassRooms);
      await deleteDoc(doc(db, "classRoom", id));
      await getData(); //update the current states data
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="classRoomContainer">
      <div className="addClassRoom">
        <AddClassRoom onSubmit={addClassRoom} onChange={onInputChange} />
      </div>

      {!loading
        ? classRooms.map((classRoom) => {
            //show the class rooms to the user
            return (
              <ClassRoom
                key={classRoom.id}
                classRoom={classRoom}
                students={students}
                teachers={teachers}
                removeClassRoom={deleteClassRoom}
              />
            );
          })
        : "loading"}
    </div>
  );
};

export default ClassRoomContainer;
