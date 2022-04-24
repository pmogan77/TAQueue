import logo from "../media/logo.png";
import '../Styles/header.css';
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
    setFetchMethod
} from 'darkreader';

function Header(props) {
  changePage = props.changePage
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
      <a href="home" onClick={changePage("Home")}>
        <img className="logo" src={logo} alt="logo" />
      </a>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="/join" onClick={changePage("Join")}>Join</a>
          </li>
          <li>
            <a href="/view" onClick={changePage("View")}>View</a>
          </li>
          <li>
            <a href="/remove" onClick={changePage("Remove")}>Remove</a>
          </li>
          <li>
            <a href="/schedule" onClick={changePage("Schedule")}>Schedule</a>
          </li>
          <button>
            <a href="/login" onClick={changePage("Login")} style={{ color: "white" }}>
              Login
            </a>
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
