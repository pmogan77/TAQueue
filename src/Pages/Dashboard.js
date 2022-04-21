import "../Styles/Dashboard.css";
import { useState } from "react";

function Dash() {
  const users = 3;
  const [open, setOpen] = useState(false);
  const toggleStatus = () => {
    setOpen(!open);
  };

  return (
    <div>
      <h1 className="courseText">CS429</h1>
      <div className="classInfoContainer">
        <span className="numPeople">
          <h2 className="numPeopleText">Number of People: {users}</h2>
        </span>

        <span className="queueStatus">
          <h2 className="queueStatusText">Queue Status: </h2>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleStatus}
              checked={open ? "checked" : ""}
            />
            <span className="slider round"></span>
          </label>
        </span>
        <select id="format_dash" className="input_dash">
          <option value="none" selected disabled hidden>
            Format
          </option>
          <option value="online">online</option>
          <option value="in-person">in-person</option>
        </select>
      </div>
      <div className="container_dash">
        <table className="table_dash">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dash;
