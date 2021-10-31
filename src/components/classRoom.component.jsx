import React, {useState, useEffect} from "react";
import firebase from "../firebase";

import { v4 as uuidv4 } from "uuid";
import './classRoom.style.css'

const ClassRoom=({students,teachers})=>{
  const [classRoomsData, setClassRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentsData,setStudentsData]=useState(students);
  const [teachersData,setTeachersData]=useState(teachers);
  

  const ref = firebase.firestore().collection("classRoom");

  //REALTIME GET FUNCTION
  const getClassRooms=()=> {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      let classRooms = [];
      querySnapshot.forEach((doc) => {
        classRooms=[...classRooms,doc.data()];
      });
      setClassRoomsData(classRooms);
      setLoading(false);
    });
  }

  useEffect(() => {
    getClassRooms();
    const classRooms=classRoomsData.map((classRoom, i)=>{
      return i<teachersData.length?classRoom.homeRoomTeacherId = teachersData[i].id:classRoom; 
    })
  }, []);

  // ADD FUNCTION
  const addClassRoom = (newClassRoom) => {
     ref
       .doc(newClassRoom.id)
       .set(newClassRoom)
       .catch((err) => {
         console.error(err);
       });
   };

  //DELETE FUNCTION
 const deleteClassRoom = (classRoom) => {
   ref
     .doc(classRoom.id)
     .delete()
     .catch((err) => {
       console.error(err);
     });
 };

  // EDIT FUNCTION
  function editClassRoom(updatedClassRoom) {
    setLoading();
    ref
      .doc(updatedClassRoom.id)
      .update(updatedClassRoom)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <div className="classRoom">{console.log(classRoomsData)}</div>
    </>
  );
}

export default ClassRoom;
