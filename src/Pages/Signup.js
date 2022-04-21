import '../Styles/Signup.css';

function Signup() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode_signup").value;
        const password = document.getElementById("password_signup").value;
        console.log(classCode, password);
    }

  return (
    <div>
      <div className='container_signup'>
          <h1>Signup</h1>
          <div className='break'></div>
            <form className='form_signup' onSubmit={handleSubmit}>
                <input id = "classCode_signup" className='classCode_signup' type='text' placeholder='Class code' style = {{marginRight: "10%"}}/>
                <input id = "password_signup" className='input_signup' type='password' placeholder='Password' />
                <br/>
                <button className='button_signup2'>Signup</button>
            </form>
      </div>
    </div>
  );
}

export default Signup;
