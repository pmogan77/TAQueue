import '../Styles/Join.css';

function Join() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode-join").value;
        const EID = document.getElementById("EID-join").value;
        const format = document.getElementById("format-join").value;
        const name = document.getElementById("name-join").value;
        console.log(classCode, EID, format, name);
    }

  return (
    <div>
      <div className='container-join'>
          <h1>Join a Queue</h1>
          <div className='break'></div>
            <form className='form-join' onSubmit={handleSubmit}>
                <input id = "name-join" className='input-join' type='text' placeholder='Name' style = {{marginRight: "10%"}}/>
                <input id = "classCode-join" className='input-join' type='text' placeholder='Class code' />
                <br/>
                <input id = "EID-join" className='input-join' type='text' placeholder='EID' style = {{marginRight: "10%"}}/>
                <select id="format-join" className='input-join'>
                    <option value="none" selected disabled hidden>Format</option>
                    <option value="online">online</option>
                    <option value="in-person">in-person</option>
                </select>
                <br/>
                <br/>
                <textarea name="paragraph-text" cols="50" rows="10" placeholder="Describe your problem here..."></textarea>
                <br/>
                <button className='button-join'>Join a Queue</button>
            </form>
          
      </div>
    </div>
  );
}

export default Join;
