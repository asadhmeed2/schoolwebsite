import React from 'react';


const Select =({studentI,onInputChange,studentsData,classRoom})=>{

    return (
      <div className="selecte">
        <label htmlFor={`student${studentI}`}>{`Student${studentI}`}</label>
        <select
          onChange={onInputChange}
          name={"student2Id"}
          defaultValue={classRoom[`student${studentI}Id`]}
        >
          <option value="0" disabled={true}>
            student
          </option>
          {studentsData.map((student) => {
            return (
              <option
                key={student.id}
                disabled={student.grade !== classRoom.grade}
                value={student.id}
              >
                {`${student.firstName} ${student.lastName}`}
              </option>
            );
          })}
        </select>
      </div>
    );
}
export default Select;