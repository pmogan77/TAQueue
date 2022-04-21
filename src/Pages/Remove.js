import '../Styles/Remove.css';

function Remove() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode_remove").value;
        const EID = document.getElementById("EID_remove").value;
        console.log(classCode, EID);
    }

  return (
    <div>
      <div className='container_remove'>
          <h1>Remove Self</h1>
          <div className='break'></div>
            <form className='form_remove' onSubmit={handleSubmit}>
                <input id = "classCode_remove" className='input_remove' type='text' placeholder='Class Code' style = {{marginRight: "10%"}}/>
                <input id = "EID_remove" className='input_remove' type='text' placeholder='EID' />
                <br/>
                <button className='button_remove'>Remove</button>
            </form>
          
      </div>
    </div>
  );
}

export default Remove;
