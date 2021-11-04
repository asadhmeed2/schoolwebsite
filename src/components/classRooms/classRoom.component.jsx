import React, { useState, useEffect } from "react";
import "./style/classRoom.style.css";
import db from "../../firebase";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import EditClassRoom from "./editClassRoom.component";
const ClassRoom = ({ classRoom, students, teachers, removeClassRoom }) => {
  //states
  const [editMode, setEditMode] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [classRoomData, setClassRoomData] = useState({
    grade: classRoom.grade,
    homeRoomTeacherId: classRoom.homeRoomTeacherId,
    hasAstudents: classRoom.hasAstudents,
    number: classRoom.number,
    student1Id: classRoom.student1Id,
    student2Id: classRoom.student2Id,
    student3Id: classRoom.student3Id,
    student4Id: classRoom.student4Id,
    student5Id: classRoom.student5Id,
    student6Id: classRoom.student6Id,
    student7Id: classRoom.student7Id,
    student8Id: classRoom.student8Id,
    student9Id: classRoom.student9Id,
    student10Id: classRoom.student10Id,
    id: classRoom.id,
  });
  const [classRoomStudents, setClassRoomStudents] = useState([]);
  // const [classRoomTeacher, setClassRoomTeacher] = useState({});
  const [showClassStudents, setShowClassStudents] = useState(false);
  //update the states before the first render
  useEffect(() => {
    setStudentsData(students);
    //eslint-disable-nex-line
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  /**
   * update the class with the available students with the same class room grade automatically
   */
  const addStudnetsToClasses = async () => {
    let tempClassStudents = [];
    let tempAllStudents = [];
    if (classRoomData.hasAstudents) return;
    let studentCounter = 0;
    tempAllStudents = studentsData.map((student) => {
      //iterate on all the students and add the students of the same grade and not assigned to anther class (class max is 10 students)
      if (
        studentCounter < 10 &&
        !student.assignToClass &&
        student.grade === classRoomData.grade
      ) {
        student.assignToClass = true;
        tempClassStudents = [...tempClassStudents, student];
        studentCounter++;
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
  const getClassStudentsFromDataBase = async () => {
    let tempClassStudents = [];
    if (classRoomStudents.length === 0) {
      for (let i = 0; i < 10; i++) {
        if (!(classRoomData[`student${i + 1}Id`].length === 0)) {
          let student = await getDoc(
            doc(db, "student", classRoomData[`student${i + 1}Id`])
          );
          tempClassStudents = [...tempClassStudents, student.data()];
        }
      }
      setClassRoomStudents(tempClassStudents);
    }
  };
  const showStudents = async () => {
    await getClassStudentsFromDataBase();
    setShowClassStudents(true);
  };
  const hideClassStudents = () => {
    setShowClassStudents(false);
  };
  /**
   *
   * @param {*} name name on the input field or select field
   * @param {*} value the input of the user
   */
  const onInputChange = (name, value) => {
    console.log(name, value);
    let tempClassRoomData = { ...classRoomData };
    tempClassRoomData[name] = value;
    setClassRoomData(tempClassRoomData);
  };
  /**
   *  updata the class room and the students and the home room teacher data
   * with assign or not assigned to a class room
   * @param {*} oldeClassRoom  the old data of the updated class room
   */
  const updateClassRoom = async (oldeClassRoom) => {
    try {
      setClassRoomStudents([]);
      setShowClassStudents(false);
      if (oldeClassRoom.homeRoomTeacherId !== classRoomData.homeRoomTeacherId) {
        if (oldeClassRoom.homeRoomTeacherId) {
          await updateDoc(doc(db, "teacher", oldeClassRoom.homeRoomTeacherId), {
            assignToClass: false,
          });
        }
        await updateDoc(doc(db, "teacher", classRoomData.homeRoomTeacherId), {
          assignToClass: true,
        });
      }

      for (let i = 1; i <= 10; i++) {
        if (oldeClassRoom[`student${i}Id`] && classRoomData[`student${i}Id`]) {
          if (
            oldeClassRoom[`student${i}Id`] !== classRoomData[`student${i}Id`]
          ) {
            await updateDoc(
              doc(db, "student", oldeClassRoom[`student${i}Id`]),
              {
                assignToClass: false,
              }
            );
            await updateDoc(
              doc(db, "student", classRoomData[`student${i}Id`]),
              {
                assignToClass: true,
              }
            );
          }
        } else if (classRoomData[`student${i}Id`]) {
          await updateDoc(doc(db, "student", classRoomData[`student${i}Id`]), {
            assignToClass: true,
          });
        }
      }
      await getClassStudentsFromDataBase();
      let tempClassRoomData = { ...classRoomData };
      if (classRoomStudents) {
        tempClassRoomData.hasAstudents = true;
      }
      console.log(tempClassRoomData);
      let res = await updateDoc(
        doc(db, "classRoom", tempClassRoomData.id),
        tempClassRoomData
      );
      setClassRoomData(tempClassRoomData);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * read the function name :) plus update the home Room Teacher data
   */
  const removeClassAndUpdateClassStudnetsAssignToClassField = async () => {
    try {
      await getClassStudentsFromDataBase();
      if (classRoomData.homeRoomTeacherId) {
        await updateDoc(doc(db, "teacher", classRoomData.homeRoomTeacherId), {
          assignToClass: false,
        });
      }

      classRoomStudents.map(async (student) => {
        await updateDoc(doc(db, "student", student.id), {
          assignToClass: false,
        });
      });
      await removeClassRoom(classRoomData.id);
    } catch (err) {
      console.error(err);
    }
  };
  //return
  return (
    <div className="classRoom">
      <p
        className="classRoomTitle"
        onClick={showStudents}
      >{`grade : ${classRoomData.grade}`}</p>
      {showClassStudents ? (
        <>
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
      <input
        type="button"
        value="Remove"
        onClick={removeClassAndUpdateClassStudnetsAssignToClassField}
      />
      <input type="button" value="edit" onClick={editModeOn} />
      {editMode ? (
        <EditClassRoom
          students={students}
          teachers={teachers}
          classRoom={classRoomData}
          onCancel={editModeOff}
          onChange={onInputChange}
          onClick={updateClassRoom}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ClassRoom;
