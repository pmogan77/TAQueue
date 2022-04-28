import logo from "../media/logo.png";
import '../Styles/header.css';
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
    setFetchMethod
} from 'darkreader';
import {Link} from "react-router-dom";


function Header() {
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
      } else {
        icon.name = "moon";
        setFetchMethod(window.fetch);
        disableDarkMode();
        localStorage.setItem("darkMode", "disabled");
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

  initDarkMode();

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
          <button>
            <Link to="/login"style={{ color: "white" }}>
              Login
            </Link>
          </button>
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
