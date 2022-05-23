import "../Styles/Dashboard.css";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

function Dash(props) {
  const { signedIn, handleUnauthorized } = props;
  const users = 3;
  const [open, setOpen] = useState(false);

  const toggleStatus = async () => {
    setOpen(!open);
    var classCode = await fetch("/api/classCode", { method: "GET" });
    classCode = await classCode.text();
    if (
      classCode === "User not found" ||
      classCode === "Internal server error"
    ) {
      handleUnauthorized();
      return;
    }
    var res = await fetch("/api/editClass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !open, classCode: classCode }),
    });
    res = await res.text();
    if (res === "Unauthorized") {
      alert("Session has expired. Please log in again.");
      handleUnauthorized();
    }
  };

  const deleteQueue = async () => {
    if (!window.confirm("Are you sure you want to clear the queue?")) {
      return;
    }
    var classCode = await fetch("/api/classCode", { method: "GET" });
    classCode = await classCode.text();
    if (
      classCode === "User not found" ||
      classCode === "Internal server error"
    ) {
      handleUnauthorized();
      return;
    }
    var res = await fetch("/api/queueClear", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classCode: classCode }),
    });
    res = await res.text();
    if (res === "Unauthorized") {
      alert("Session has expired. Please log in again.");
      handleUnauthorized();
    } else {
      alert("Queue has been cleared");
    }
  };

  if (!signedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h1 className="course-text">test</h1>
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
        <select id="format-dash" className="input-dash" defaultValue={"none"}>
          <option value="none" disabled hidden>
            Format (optional)
          </option>
          <option value="online">online</option>
          <option value="in-person">in-person</option>
        </select>
        <Link to="/settings" className="settings-dash">
          <ion-icon name="settings-outline"></ion-icon>
        </Link>
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
      <div
        className="create-button-container"
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }
      >
        <button className="create-button">
          <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      </div>

      <div className="clear-button-container" onClick={deleteQueue}>
        <button className="clear-button">Clear Queue</button>
      </div>
    </div>
  );
}

export default Dash;
