import './Login.css';

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode_login").value;
        const password = document.getElementById("password_login").value;
        console.log(classCode, password);
    }

  return (
    <div>
      <div className='container_login'>
          <h1>Login</h1>
          <div className='break'></div>
            <form className='form_login' onSubmit={handleSubmit}>
                <input id = "classCode_login" className='classCode_login' type='text' placeholder='Class code' style = {{marginRight: "10%"}}/>
                <input id = "password_login" className='input_login' type='password' placeholder='Password' />
                <br/>
                <button className='button_login'>Login</button>
            </form>

            <br/>
            <button className='button_signup'>Signup</button>
      </div>
    </div>
  );
}

export default Login;
