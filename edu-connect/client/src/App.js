import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Welcome from './components/Welcome'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import userContext from './context';
import AddqueryForm from './components/AddQueryForm';

function App() {
  return (
    <>
    <Router>
      <userContext.Provider value={{auth:null,user:null}}>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route path='/sign-up' element={<Register />} />
          <Route path='/welcome' element={<Welcome />}/>
        </Routes>
      </userContext.Provider>
    </Router>
    
    </>
  );
}

export default App;
