import "../Styles/Login.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import { Navigate } from 'react-router-dom';

function Login(props) {
  const {auth, signedIn, setSignedIn} = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    const classCode = document.getElementById("classCode-login").value;
    const password = document.getElementById("password-login").value;
    if(!(classCode && password)) {
      alert("Please fill out all fields");
      return;
    }
    const email = classCode + "@taqueue.com";
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password).then((res) => {
      console.log(res);
      auth.currentUser.getIdToken().then((token) => {
        fetch('/api/auth', {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({Token: token})})
        .then(res => {
            res.text().then(res => {
                console.log(res);
                setSignedIn(true);
            })
        })
        .catch(err => console.log(err));
      });
    }).catch((error) => {
      alert(error.message);
    });
      
  };

  const resetNotification = () => {
    alert("Please send an email to ****@****.**** from the provided email to reset your password.");
  };

  if(signedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div>
      <div className="container-login">
        <h1>Login</h1>
        <div className="break"></div>
        <form className="form-login" onSubmit={handleSubmit}>
          <input
            id="classCode-login"
            className="classCode-login"
            type="text"
            placeholder="Class code" 
            style={{ marginRight: "0%" }}
          />
          <input
            id="password-login"
            className="input-login"
            type="password"
            placeholder="Password"
          />
          <br />
          <button className="button-login">Login</button>
        </form>

        <br />
        <Link to="/signup">
          <button className="button-signup">Signup</button>
        </Link>
        <br />
        <div className="forgot-password-login"><span onClick={resetNotification}>Forgot password</span></div>
      </div>
    </div>
  );
}

export default Login;
