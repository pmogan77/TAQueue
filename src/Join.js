import './Join.css';

function Join() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode_join").value;
        const EID = document.getElementById("EID_join").value;
        const format = document.getElementById("format_join").value;
        const name = document.getElementById("name_join").value;
        console.log(classCode, EID, format, name);
    }

  return (
    <div>
      <div className='container_join'>
          <h1>Join a Queue</h1>
          <div className='break'></div>
            <form className='form_join' onSubmit={handleSubmit}>
                <input id = "name_join" className='input_join' type='text' placeholder='Name' style = {{marginRight: "10%"}}/>
                <input id = "classCode_join" className='input_join' type='text' placeholder='Class code' />
                <br/>
                <input id = "EID_join" className='input_join' type='text' placeholder='EID' style = {{marginRight: "10%"}}/>
                <select id="format_join" className='input_join'>
                    <option value="none" selected disabled hidden>Format</option>
                    <option value="online">online</option>
                    <option value="in-person">in-person</option>
                </select>
                <br/>
                <br/>
                <textarea name="paragraph_text" cols="50" rows="10" placeholder="Describe your problem here..."></textarea>
                <br/>
                <button className='button_join'>Join a Queue</button>
            </form>
          
      </div>
    </div>
  );
}

export default Join;
