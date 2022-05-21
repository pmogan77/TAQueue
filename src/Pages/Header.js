import '../Styles/header.css';
import { useState } from "react";
import {signOut} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
    setFetchMethod
} from 'darkreader';
import {Link} from "react-router-dom";


function Header(props) {
  const {auth, signedIn} = props;
  const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll("nav ul li, nav ul button, .nav-links ion-icon");
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      // console.log(link);
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });

    burger.classList.toggle("toggle");
  };

  const toggleTheme = async function() {
    // check if ion-icon name is "moon"
    const icon = document.querySelector(".nav-links ion-icon");
      if(icon.name === "moon") {
        icon.name = "sunny-outline";
        setFetchMethod(window.fetch);
        enableDarkMode();
        localStorage.setItem("darkMode", "enabled");
        if(window.innerWidth <= 900) {
          setLogo(require("../media/logo-dark-res.png"));
        } else {
          setLogo(require("../media/logo-dark.png"));
        }
      } else {
        icon.name = "moon";
        setFetchMethod(window.fetch);
        disableDarkMode();
        localStorage.setItem("darkMode", "disabled");
        if(window.innerWidth <= 900) {
          setLogo(require("../media/logo-res.png"));
        } else {
          setLogo(require("../media/logo.png"));
        }
      } 
  };

  const initDarkMode = () => {
    const darkMode = localStorage.getItem("darkMode");
    if(darkMode === "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };

  window.onresize = () => {
    setLogo(require("../media/logo"+(localStorage.getItem("darkMode") === "enabled" ? "-dark" : "")+(window.innerWidth <= 900 ? "-res" : "")+".png"));
  };

  initDarkMode();
  var [logo, setLogo] = useState(require("../media/logo"+(localStorage.getItem("darkMode") === "enabled" ? "-dark" : "")+(window.innerWidth <= 900 ? "-res" : "")+".png"));

  const handleLogOut = () => {
    if(document.querySelector(".log-button").innerText === "Login") {
      return;
    }

    // handle logout here
    signOut(auth).then(()=>{

      //LOGOUT HERE
      console.log("signed out");

      if(auth.currentUser) {
        console.log("user still signed in");
      } else {
        console.log("user signed out");
      }

      fetch('/api/auth', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({Token: null})})
          .then(res => {
              res.text().then(res => 
              console.log(res))
          })
          .catch(err => console.log(err));
    })
    .catch((error) => {
      console.error(error);
    })
    
  }

  return (
    <header id="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/join" >Join</Link>
          </li>
          <li>
            <Link to="/view" >View</Link>
          </li>
          <li>
            <Link to="/remove" >Remove</Link>
          </li>
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
          <li style={{display: signedIn ? "" : "none"}}><Link to="/dashboard">Dashboard</Link></li>
          <Link to="/login">
            <button className = "log-button" style={{ color: "white", fontSize: "16px", fontWeight: "bold"}} onClick={handleLogOut}>
                {signedIn ? "Logout" : "Login"}
            </button>
          </Link>
          <ion-icon name={localStorage.getItem("darkMode") && localStorage.getItem("darkMode") === "enabled" ? "sunny-outline" : "moon"} onClick={toggleTheme}></ion-icon>  
        </ul>
      </nav>
      <div className="burger" onClick={navSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </header>
  );
}

export default Header;
