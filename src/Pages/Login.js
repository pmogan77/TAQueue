import '../Styles/Login.css';
import { Link } from "react-router-dom";

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode-login").value;
        const password = document.getElementById("password-login").value;
        console.log(classCode, password);
    }

  return (
    <div>
      <div className='container-login'>
          <h1>Login</h1>
          <div className='break'></div>
            <form className='form-login' onSubmit={handleSubmit}>
                <input id = "classCode-login" className='classCode-login' type='text' placeholder='Class code' style = {{marginRight: "10%"}}/>
                <input id = "password-login" className='input-login' type='password' placeholder='Password' />
                <br/>
                <button className='button-login'>Login</button>
            </form>

            <br/>
            <button className='button-signup'><Link to="/signup" style={{"color": "#0072FF", "fontSize": "15px"}}>Signup</Link></button>

      </div>
    </div>
  );
}

export default Login;
