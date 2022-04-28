import './App.css';
import Header from './Pages/Header.js';
import Home from './Pages/Home.js';
import Error from './Pages/404.js';
import About from './Pages/About.js';
import Remove from './Pages/Remove.js';
import Schedule from './Pages/Schedule.js';
import Join from './Pages/Join.js';
import Login from './Pages/Login.js';
import Signup from './Pages/Signup.js';
import View from './Pages/View.js';
import Dashboard from './Pages/Dashboard.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/home" exact element={<Home/>} />
        <Route path="/index" exact element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/remove" element={<Remove/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/view" element={<View/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  );
}

export default App;
