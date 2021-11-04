import React, { useState} from "react";
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
  const [classRoomData] = useState(classRoom);
  const [teachersData] = useState(teachers);
  //cancel the edit mode and hides the edit form
  const onCancelBtnClick = () => {
    onCancel(classRoomData);
  };
  //handles the form submit
  const onEditBtnClick = (e) => {
    e.preventDefault();
    onCancelBtnClick()
    onClick(classRoomData);
  };
  //handles the input change
  const onInputChange = (e) => {
    if (e.target.name === "homeRoomTeacherId") {
      e.target.classList.remove("red");
      if(classRoomData.homeRoomTeacherId===""){
        onChange(e.target.name, e.target.value);
      }
      let tempTeacher = teachersData.find(
        (teacher) => teacher.id === e.target.value
      );
      if (
        !tempTeacher.assignToClass ||
        e.target.value === classRoomData.homeRoomTeacherId
      ) {
        onChange(e.target.name, e.target.value);
      }else{
         e.target.classList.add("red");
      }
    }else if(e.target.name.slice(0,7)==='student'){
      e.target.classList.remove("red")
        let tempStudent = students.find(
          (student) => student.id === e.target.value
        );
         if (
           !tempStudent.assignToClass ||
           e.target.value === classRoom[e.target.name]
         ) {
           onChange(e.target.name, e.target.value);
         } else {
           e.target.classList.add("red");
         }
    }else{
      console.log(e.target.name,e.target.value);
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
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={2}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={3}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={4}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={5}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={6}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={7}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={8}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={9}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <Select
          studentI={10}
          onInputChange={onInputChange}
          studentsData={students}
          classRoom={classRoom}
        />
        <input type="submit" value="Confirm" />
        <input type="button" value="Cancel" onClick={onCancelBtnClick} />
      </form>
    </div>
  );
};
export default EditClassRoom;
