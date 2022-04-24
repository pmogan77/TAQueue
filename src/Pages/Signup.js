import '../Styles/Signup.css';

function Signup() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode-signup").value;
        const password = document.getElementById("password-signup").value;
        console.log(classCode, password);
    }

  return (
    <div>
      <div className='container-signup'>
          <h1>Signup</h1>
          <div className='break'></div>
            <form className='form_signup' onSubmit={handleSubmit}>
                <input id = "classCode-signup" className='classCode-signup' type='text' placeholder='Class code' style = {{marginRight: "10%"}}/>
                <input id = "password-signup" className='input-signup' type='password' placeholder='Password' />
                <br/>
                <button className='button-signup2'>Signup</button>
            </form>
      </div>
    </div>
  );
}

export default Signup;
