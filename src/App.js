import School from './components/school.component'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/navbar.component'
import StudentContainer from './components/studentContainer.component'
import TeacherContainer from './components/teacherContainer.component'
// import ClassRoom from './components/classRoom.component'
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Route path="/" exact component={School} />
        <Route path="/students" component={StudentContainer}/>
        <Route path="/teachers" component={TeacherContainer}/>
      </Router>
    </div>
  );
}

export default App;
