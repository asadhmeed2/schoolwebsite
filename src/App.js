import School from './components/school.component'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/navbar.component'
import StudentContainer from './components/studentContainer.component'
import Firebase from './firebase'
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Route path="/" exact component={School} />
        <Route path="/students" component={StudentContainer}/>
      </Router>
    </div>
  );
}

export default App;
