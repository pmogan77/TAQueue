import { useState } from "react";
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

function App() {
  const [curPage, setPage] = useState("Home");

  function getPage(){ 
    switch(curPage) {
      case "Home":
        return <Home/>
      case "About":
        return <About/>
      case "Remove":
        return <Remove/>
      case "Schedule":
        return <Schedule/>
      case "Join":
        return <Join/>
      case "Login":
        return <Login/>
      case "Signup":
        return <Signup/>
      case "View":
        return <View/>
      default:
        return <Error/>
    }
  }

  return (
    <div>
      <Header />
      {this.getPage()}
      {/* <Home/> */}
      {/* <Error/> */}
      {/* <About/> */}
      {/* <Remove/> */}
      {/* <Schedule/> */}
      {/* <Join/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <View/> */}
      <Dashboard/>
    </div>
  );
}

export default App;
