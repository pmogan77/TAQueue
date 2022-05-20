import "../Styles/Dashboard.css";
import { useState } from "react";
import { Navigate } from 'react-router-dom';

function Dash(props) {
  const {signedIn} = props;
  const users = 3;
  const [open, setOpen] = useState(false);
  const toggleStatus = () => {
    setOpen(!open);
  };
  if(!signedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h1 className="course-text">CS429</h1>
      <div className="class-info-container">
        <span className="num-people">
          <h2 className="num-people-text">Number of People: {users}</h2>
        </span>

        <span className="queue-status">
          <h2 className="queue-status-text">Queue Status: </h2>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleStatus}
              checked={open ? "checked" : ""}
            />
            <span className="slider round"></span>
          </label>
        </span>
        <select id="format-dash" className="input-dash" defaultValue={'none'}>
          <option value="none" disabled hidden>
            Format
          </option>
          <option value="online">online</option>
          <option value="in-person">in-person</option>
        </select>
      </div>
      <div className="container-dash">
        <table className="table-dash">
          <thead>
            <tr style={{ border: "none" }}>
              <th></th>
              <th>Name</th>
              <th>EID</th>
              <th>Format</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">
                <span className="position">01</span>
              </td>
              <td>Ayaan</td>
              <td>GH3456</td>
              <td>In-person</td>
              <td rowSpan="2">
                <ion-icon name="close-outline"></ion-icon>
              </td>
            </tr>
            <tr>
              <td className="problem" colSpan="2">
                This is my problemwoefniw efwn pf nowneonofwnepo nfwienon
                foiweinio nfowien oiqnoi enino
              </td>
            </tr>

            <tr>
              <td rowSpan="2">
                <span className="position">02</span>
              </td>
              <td>Ayaan</td>
              <td>GH3456</td>
              <td>In-person</td>
              <td rowSpan="2">
                <ion-icon name="close-outline"></ion-icon>
              </td>
            </tr>
            <tr>
              <td className="problem" colSpan="2">
                This is my problemwoefniw efwn pf nowneonofwnepo nfwienon
                foiweinio nfowien oiqnoi enino
              </td>
            </tr>

            <tr>
              <td rowSpan="2">
                <span className="position">03</span>
              </td>
              <td>Ayaan</td>
              <td>GH3456</td>
              <td>In-person</td>
              <td rowSpan="2">
                <ion-icon name="close-outline"></ion-icon>
              </td>
            </tr>
            <tr>
              <td className="problem" colSpan="2">
                This is my problemwoefniw efwn pf nowneonofwnepo nfwienon
                foiweinio nfowien oiqnoi enino
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="delete-class">
        <div className="delete-button">Delete Class</div>
      </div>
    </div>
  );
}

export default Dash;
