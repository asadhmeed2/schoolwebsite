import React, { useState, useEffect } from "react";
import "./style/classRoom.style.css";
import db from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import EditClassRoom from "./editClassRoom.component";
const ClassRoom = ({ classRoom, students, teachers }) => {
  //states
  const [editMode, setEditMode] = useState(false);
  const [studentsData, setStudentsData] = useState(students);
  const [teachersData, setTeachersData] = useState(teachers);
  const [classRoomData, setClassRoomData] = useState(classRoom);
  const [classRoomStudents, setClassRoomStudents] = useState([]);
  const [showClassStudents, setShowClassStudents] = useState(false);
  //references to data base
  const classRoomRef = collection(db, "classRoom");
  const teacherRef = collection(db, "teacher");
  const studentRef = collection(db, "student");
  //update the states before the first render
  useEffect(() => {
    setStudentsData(students);
    setTeachersData(teachers);
    setClassRoomData(classRoom);
  }, []);
  //inner functions
  const updateTeacher = (isAssignToClass) => {};
  const updateStudent = (isAssignToClass) => {};
  /**
   * update the class automatically
   */
  const addStudnetsToClasses = async () => {
    let tempClassStudents = [];
    let tempAllStudents = [];
    if (classRoomData.hasAstudents) return;
    tempAllStudents = studentsData.map((student, i) => {
      //iterate on all the students and add the students of the same grade and not assigned to anther class (class max is 10 students)
      if (
        i < 10 &&
        !student.isAssignToClass &&
        student.grade == classRoomData.grade
      ) {
        student.assignToClass = true;
        tempClassStudents = [...tempClassStudents, student];
        return student;
      }
      return student;
    });
    let tempClassRoom = { ...classRoomData };
    tempClassStudents.forEach(async (student, i) => {
      tempClassRoom[`student${i + 1}Id`] = student.id;
      await updateDoc(doc(db, "student", student.id), student);
    });
    if (tempClassStudents.length > 0) {
      tempClassRoom.hasAstudents = true;
      await updateDoc(doc(db, "classRoom", tempClassRoom.id), tempClassRoom);
    }
    setStudentsData((prev) => tempAllStudents);
    setClassRoomData((prev) => tempClassRoom);
    setClassRoomStudents((prev) => tempClassStudents);
  };
  const editModeOn = () => {
    setEditMode(true);
  };
  const editModeOff = () => {
    setEditMode(false);
  };
  const showStudents = async () => {
    let tempClassStudents = [];
    if (classRoomStudents.length === 0) {
      for (let i = 0; i < 10; i++) {
        console.log(!(classRoom[`student${i + 1}Id`].length === 0));
        if (!(classRoom[`student${i + 1}Id`].length === 0)) {
          let student = await getDoc(
            doc(db, "student", classRoom[`student${i + 1}Id`])
          );
          tempClassStudents = [...tempClassStudents, student.data()];
        }
      }
      setClassRoomStudents(tempClassStudents);
    }
    setShowClassStudents(true);
  };
  const hideClassStudents = () => {
    setShowClassStudents(false);
  };
  const onInputChange = (name, value) => {
    let tempClassRoomData = { ...classRoomData };
    tempClassRoomData[name] = value;
    setClassRoomData(tempClassRoomData);
  };
  const updateClassRoom = async(oldeClassRoom) => {
    try {
      if (oldeClassRoom.homeRoomTeacherId !== classRoomData.homeRoomTeacherId) {
        await updateDoc(doc(db, "teacher", oldeClassRoom.homeRoomTeacherId), {
          assignToClass: false,
        });
        await updateDoc(doc(db, "teacher", classRoomData.homeRoomTeacherId), {
          assignToClass: true,
        });
      }
      for (let i = 1; i <= 10; i++) {
        if (oldeClassRoom[`student${i}Id`] && classRoomData[`student${i}Id`]) {
          if (
            oldeClassRoom[`student${i}Id`] !== classRoomData[`student${i}Id`]
            ) {
            await updateDoc(doc(db, "student", oldeClassRoom[`student${i}Id`]), {
              assignToClass: false,
            });
            await updateDoc(
              doc(db, "student", classRoomData[`student${i}Id`]),
              {
                assignToClass: true,
              }
            );
          }
        }else if (classRoomData[`student${i}Id`]) {
          await updateDoc(doc(db, "student", classRoomData[`student${i}Id`]), {
            assignToClass: true,
          });
        }
        
      }
    } catch (err) {
      console.error(err);
    }
  };
  //return
  return (
    <div className="classRoom">
      {console.log(classRoomStudents)}
      <p
        className="classRoomTitle"
        onClick={showStudents}
      >{`grade : ${classRoom.grade}`}</p>
      {showClassStudents ? (
        <>
          {console.log(classRoomStudents)}
          {classRoomStudents.map((student, i) => {
            return (
              <p key={student.id} className="studentFirstName">{`${
                i + 1
              } First Name : ${student.firstName}`}</p>
            );
          })}
          <input type="button" value="Hide" onClick={hideClassStudents} />
        </>
      ) : (
        ""
      )}
      <input
        type="button"
        value="Add Students Auto"
        onClick={addStudnetsToClasses}
      />
      <input type="button" value="edit" onClick={editModeOn} />
     {editMode? <EditClassRoom
        students={studentsData}
        teachers={teachersData}
        classRoom={classRoomData}
        onCancel={editModeOff}
        onChange={onInputChange}
        onClick={updateClassRoom}
      />:""}
    </div>
  );
};

export default ClassRoom;
