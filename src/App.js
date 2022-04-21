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
  return (
    <div>
      <Header />
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
