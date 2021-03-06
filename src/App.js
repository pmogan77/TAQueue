import "./App.css";
import Header from "./Pages/Header.js";
import Home from "./Pages/Home.js";
import Error from "./Pages/404.js";
import About from "./Pages/About.js";
import Remove from "./Pages/Remove.js";
import Schedule from "./Pages/Schedule.js";
import Join from "./Pages/Join.js";
import Login from "./Pages/Login.js";
import Signup from "./Pages/Signup.js";
import View from "./Pages/View.js";
import Dashboard from "./Pages/Dashboard.js";
import Settings from "./Pages/Settings.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import { useState } from "react";

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
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const getCookie = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
  var [signedIn, setSignedIn] = useState(
    getCookie("token") != null && getCookie("token") !== ""
  );

  const handleUnauthorized = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
        // fetch auth with null token body
        fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Token: null }),
        }).then((res) => {
          res.text().then((res) => {
            console.log(res);
            setSignedIn(false);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ensures auth status matches token status
  if (!signedIn) {
    signOut(auth)
      .then(() => {
        console.log("ensure sign out");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Router>
      <Header auth={auth} signedIn={signedIn} setSignedIn={setSignedIn} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/index" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/remove" element={<Remove />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/join" element={<Join />} />
        <Route
          path="/login"
          element={
            <Login auth={auth} signedIn={signedIn} setSignedIn={setSignedIn} />
          }
        />
        <Route
          path="/signup"
          element={<Signup auth={auth} db={db} setSignedIn={setSignedIn} />}
        />
        <Route path="/view" element={<View />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              auth={auth}
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              handleUnauthorized={handleUnauthorized}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              auth={auth}
              signedIn={signedIn}
              setSignedIn={setSignedIn}
              handleUnauthorized={handleUnauthorized}
            />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
