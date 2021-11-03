import School from './components/scool-main-page/school.component'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar.component'
import StudentContainer from './components/students/studentContainer.component'
import TeacherContainer from './components/teachers/teacherContainer.component'
import ClassRoomContainer from './components/classRooms/classRoomContainer.component'
import SignUp from './components/loginSignup/signUp.comonent'
import './App.css';
import {useAuth,logOut} from './firebase'

function App() {
  let user = useAuth();
  return (
    <div className="App">
      <Router>
        <Navbar logedInUser={user} logOut={logOut} />
        <Route path="/" exact component={School} />
        <Route path="/students" component={StudentContainer} />
        <Route path="/teachers" component={TeacherContainer} />
        <Route path="/classes" component={ClassRoomContainer} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </div>
  );
}

export default App;
