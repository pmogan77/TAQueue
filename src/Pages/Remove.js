import '../Styles/Remove.css';

function Remove() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode-remove").value;
        const EID = document.getElementById("EID-remove").value;
        console.log(classCode, EID);
    }

  return (
    <div>
      <div className='container-remove'>
          <h1>Remove Self</h1>
          <div className='break'></div>
            <form className='form-remove' onSubmit={handleSubmit}>
                <input id = "classCode-remove" className='input-remove' type='text' placeholder='Class Code' style = {{marginRight: "10%"}}/>
                <input id = "EID-remove" className='input-remove' type='text' placeholder='EID' />
                <br/>
                <button className='button-remove'>Remove</button>
            </form>
          
      </div>
    </div>
  );
}

export default Remove;
