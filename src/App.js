import School from './components/scool-main-page/school.component'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/navbar.component'
import StudentContainer from './components/students/studentContainer.component'
import TeacherContainer from './components/teachers/teacherContainer.component'
import ClassRoomContainer from './components/classRooms/classRoomContainer.component'
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Route path="/" exact component={School} />
        <Route path="/students" component={StudentContainer}/>
        <Route path="/teachers" component={TeacherContainer}/>
        <Route path="/classes" component={ClassRoomContainer}/>
      </Router>
    </div>
  );
}

export default App;
