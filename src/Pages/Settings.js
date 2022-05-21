import '../Styles/Settings.css';
import { Navigate } from 'react-router-dom';

function Settings(props) {
    const {signedIn} = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        const classCode = document.getElementById("classCode-settings").value;
        const EID = document.getElementById("EID-settings").value;
        console.log(classCode, EID);
    }
    if(!signedIn) {
        return <Navigate to="/login" />;
    }
  return (
    <div>
      <div className='container-settings'>
          <h1>Settings</h1>
          <div className='break'></div>
            <form className='form-settings' onSubmit={handleSubmit}>
                <input id = "meeting-settings" className='input-settings' type='URL' placeholder='Meeting URL' style = {{marginRight: "0%"}}/>
                <input id = "schedule-settings" className='input-settings' type='URL' placeholder='Schedule Image URL' />
                <br/>
                <button className='change-settings'>Change</button>
            </form>
          
      </div>
    </div>
  );
}

export default Settings;
