import React, { useState, useEffect } from "react";
import "./style/editClassRoom.style.css";

const EditClassRoom = ({
  classRoom,
  onChange,
  onCancel,
  teachers,
  students,
  onClick,
}) => {
  const [classRoomData, setClassRoomData] = useState({});
  const [teachersData, setTeachersData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    setClassRoomData((prev) => classRoom);
    setTeachersData((prev) => teachers);
    setStudentsData((prev) => students);

    console.log(teachers);
    console.log(classRoom);
  }, []);
  const onCancelBtnClick = () => {
    onCancel(classRoomData);
  };
  const onEditBtnClick = () => {
    onClick(classRoomData);
  };
  const onInputChange = (e) => {
    onChange(e.target.name, e.target.value);
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
        <label htmlFor="grade">Home Room Teacher</label>
        <select
          onChange={onInputChange}
          defaultValue={classRoom.homeRoomTeacherId}
        >
          <option value="0" disabled={true}>
            home Room teacher
          </option>
          {teachersData.map((teacher) => {
            return (
              <option
                key={teacher.id}
                disabled={teacher.assignToClass}
                value={teacher.id}
              >
                {`${teacher.firstName} ${teacher.lastName}`}
              </option>
            );
          })}
        </select>

        <input type="submit" value="Confirm" />
        <input type="button" value="Cancel" onClick={onCancelBtnClick} />
      </form>
    </div>
  );
};
export default EditClassRoom;
