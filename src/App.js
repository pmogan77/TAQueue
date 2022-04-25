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
  // const [curPage, setPage] = useState("Home");

  // const changePage = (page) => {
  //   setPage(page)
  // }
  // function getPage(){ 
  //   switch(curPage) {
  //     case "Home":
  //       return <div><Header changePage={changePage} /> <Home/></div>
  //     case "About":
  //       return <div><Header changePage={changePage} /> <About/></div>
  //     case "Remove":
  //       return <div><Header changePage={changePage} /> <Remove/></div>
  //     case "Schedule":
  //       return <div><Header changePage={changePage} /> <Schedule/></div>
  //     case "Join":
  //       return <div><Header changePage={changePage} /> <Join/></div>
  //     case "Login":
  //       return <div><Header changePage={changePage} /> <Login/></div>
  //     case "Signup":
  //       return <div><Header changePage={changePage} /> <Signup/></div>
  //     case "View":
  //       return <div><Header changePage={changePage} /> <View/></div>
  //     case "Dashboard":
  //       return <div><Header changePage={changePage} /> <Dashboard/></div>
  //     default:
  //       return <div><Header changePage={changePage} /> <Error/></div>
  //   }
  // }

  return (
    <div>
      {/* {getPage()} */}
      {<Header/>}
      {/* <Home/> */}
      {/* <Error/> */}
      <About/>
      {/* <Remove/> */}
      {/* <Schedule/> */}
      {/* <Join/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <View/> */}
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;
