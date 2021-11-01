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
  updateDoc,
} from "firebase/firestore";
import AddClassRoom from "./addClassRoom.component"

const ClassRoomContainer = () => {
  const [classRooms, setClassRooms] = useState([]);
  const [teachers,setTeachers]=useState([])
  const [students,setStudents]=useState([])
  const [loading, setLoading] = useState(false);
  const [classRoom, setClassRoom] = useState({
    grade: "",
    homeRoomTeacherId: "",
    hasAstudents:false,
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
  const classRoomRef = collection(db, "classRoom");
  const teacherRef = collection(db, "teacher");
  const studentRef = collection(db, "student");
//initialize the states and get the data from the server
  useEffect(async () => {
    try {
      setLoading(true);
      const data = await getDocs(classRoomRef);
      const studentData = await getDocs(studentRef);
      const teacherData = await getDocs(teacherRef);
      setClassRooms((prev) =>
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setStudents((prev) =>
        studentData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setTeachers((prev) =>
        teacherData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);
  // add a new class room to the data base
  const addClassRoom = async () => {
    const tempClassRoom = { ...classRoom };
    tempClassRoom.id = uuidv4();
    setClassRooms((prev) => [...classRooms, tempClassRoom]);
    const res = await setDoc(
      doc(db, "classRoom", tempClassRoom.id),
      tempClassRoom
    );
  };
  const onInputChange = (name, value) => {
    const tempClassRoom = { ...classRoom };
    tempClassRoom[name] = value;
    setClassRoom(tempClassRoom);
  };
  const clearClassRoomData = () => {
    setClassRoom({
      grade: "",
      number: 0,

    });
  };
  const deleteClassRoom = async (id) => {
    try {
      let tempClassRooms = [...classRooms];
      tempClassRooms = tempClassRooms.filter((teacher) => teacher.id !== id);
      setClassRooms((prev) => tempClassRooms);
      await deleteDoc(doc(db, "classRoom", id));
    } catch (e) {
      console.error(e);
    }
  };

  // const updateClassRoom = async (classRoomData) => {
  //   try {
  //     let TempClassRoomDatas = classRooms.map((classRoom) => {
  //       if (classRoom.id === classRoomData.id) return classRoomData;
  //       return classRoom;
  //     });
  //     setClassRooms(TempClassRoomDatas);
  //     let res = await updateDoc(
  //       doc(db, "teacher", classRoomData.id),
  //       classRoomData
  //     );
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  return (
    <div className="classRoomContainer">
      <div className="addClassRoom">
        <AddClassRoom onSubmit={addClassRoom} onChange={onInputChange}/>
      </div>
      {classRooms.map((classRoom)=>{
        return <ClassRoom key={classRoom.id} classRoom={classRoom} students={students} teachers={teachers}/>
      })

      }
    </div>
  );
};

export default ClassRoomContainer;
