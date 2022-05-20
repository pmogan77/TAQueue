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
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import {useState} from "react";

// TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDpuiaBgE9P9DTjFz-ZlMFlu9kGxfqa2Ug",
    authDomain: "ta-queue-5552c.firebaseapp.com",
    projectId: "ta-queue-5552c",
    storageBucket: "ta-queue-5552c.appspot.com",
    messagingSenderId: "25633698094",
    appId: "1:25633698094:web:de4388272f18e858b68abf",
    measurementId: "G-F8GWF0Q2Y3",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

function App() {
  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  } 
  var [signedIn, setSignedIn] = useState(getCookie("token") != null && getCookie("token") != "");
  onAuthStateChanged(auth, (user) => {
    if(user) {
      setSignedIn(true);
      console.log("signed in");
    } else {
      setSignedIn(false);
      console.log("signed out");
    }
  });
  return (
    <Router>
      <Header auth={auth} signedIn={signedIn}/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/home" exact element={<Home/>} />
        <Route path="/index" exact element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/remove" element={<Remove/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login auth={auth} signedIn={signedIn}/>} />
        <Route path="/signup" element={<Signup auth={auth} db={db}/>} />
        <Route path="/view" element={<View/>} />
        <Route path="/dashboard" element={<Dashboard signedIn={signedIn}/>}/>
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  );
}

export default App;
