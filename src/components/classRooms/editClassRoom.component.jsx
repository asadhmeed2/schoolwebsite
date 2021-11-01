import React, { useState, useEffect } from "react";
import "./style/editClassRoom.style.css";
import Select from "./selectStudent.component"
const EditClassRoom = ({
  classRoom,
  onChange,
  onCancel,
  teachers,
  students,
  onClick,
}) => {
  const [classRoomData, setClassRoomData] = useState(classRoom);
  const [teachersData, setTeachersData] = useState(teachers);
  const [studentsData, setStudentsData] = useState(students);
  const[choseWrongTeacher,setChoseWrongTeacher] = useState(false)
  const [choseWrongStudent, setChoseWrongStudent] = useState(false);
  const onCancelBtnClick = () => {
    onCancel(classRoomData);
  };
  const onEditBtnClick = (e) => {
    e.preventDefault();
    onCancelBtnClick()
    onClick(classRoomData);
  };
  const onInputChange = (e) => {
    if (e.target.name === "homeRoomTeacherId") {
      setChoseWrongTeacher(false);
      let tempTeacher = teachersData.find(
        (teacher) => teacher.id === e.target.value
      );
      if (
        !tempTeacher.assignToClass ||
        e.target.value === classRoomData.homeRoomTeacherId
      ) {
        onChange(e.target.name, e.target.value);
      }else{
        setChoseWrongTeacher(true)
      }
    }else if(e.target.name.slice(0,7)==='student'){
      e.target.classList.remove("red")
        let tempStudent = studentsData.find(
          (student) => student.id === e.target.value
        );
        console.log(tempStudent);
         if (
           !tempStudent.assignToClass ||
           e.target.value === classRoomData[e.target.name]
         ) {
           onChange(e.target.name, e.target.value);
         } else {
           e.target.classList.add("red");
         }
    }else{
      onChange(e.target.name, e.target.value);
    }
  };
  return (
    <div className="editClassRoom">
      <form action="" onSubmit={onEditBtnClick}>
        <label htmlFor="grade">Grade</label>
        <input
          type="text"
          name="grade"
          value={classRoom.grade}
          onChange={onInputChange}
        />
        <label htmlFor="homeRoomTeacherId">Home Room Teacher</label>
        <select
          onChange={onInputChange}
          name={"homeRoomTeacherId"}
          defaultValue={classRoom.homeRoomTeacherId}
          style={{ border: choseWrongTeacher ? "1px solid read" : "" }}
        >
          <option value="0" disabled={true}>
            home Room teacher
          </option>
          {teachersData.map((teacher) => {
            return (
              <option key={teacher.id} value={teacher.id}>
                {`${teacher.firstName} ${teacher.lastName}`}
              </option>
            );
          })}
        </select>
        <Select
          studentI={1}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={2}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={3}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={4}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={5}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={6}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={7}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={8}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={9}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />
        <Select
          studentI={10}
          onInputChange={onInputChange}
          studentsData={studentsData}
          classRoom={classRoom}
        />

        
        {choseWrongStudent ? (
          <span style={{ color: "red" }}>{"chose anther student"}</span>
        ) : (
          ""
        )}

        <input type="submit" value="Confirm" />
        <input type="button" value="Cancel" onClick={onCancelBtnClick} />
      </form>
    </div>
  );
};
export default EditClassRoom;
