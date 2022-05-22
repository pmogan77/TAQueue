import '../Styles/Settings.css';
import { Navigate } from 'react-router-dom';

function Settings(props) {
    const {signedIn} = props;
    const editClass = (e) => {
        e.preventDefault();
        const meeting = document.getElementById("meeting-settings").value;
        const schedule = document.getElementById("schedule-settings").value;
        console.log(meeting, schedule);
    }

    const deleteClass = () => {
        if(!window.confirm("Are you sure you want to delete this class?")) {
          return;
        }
        console.log("deleting class");
        var classCode = document.querySelector(".course-text").innerText;
        fetch('/api/class', {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({classCode: classCode})}).then(res => {
          res.text().then(res => {
            console.log(res);
            window.location.href = "/";
          }
        ).catch(err => console.log(err));
      });
    }

    // if(!signedIn) {
    //     return <Navigate to="/login" />;
    // }
  return (
    <div>
      <div className='container-settings'>
          <h1>Settings</h1>
          <div className='break'></div>
            <form className='form-settings'>
                <input id = "meeting-settings" className='input-settings' type='URL' placeholder='Meeting URL' style = {{marginRight: "0%"}}/>
                <input id = "schedule-settings" className='input-settings' type='URL' placeholder='Schedule Image URL' />
                <br/>
                <button className='change-settings' onClick={editClass}>Change</button>
                <button className='delete-settings' onClick={deleteClass}>Delete Class</button>
            </form>
          
      </div>
    </div>
  );
}

export default Settings;
