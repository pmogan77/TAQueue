import "../Styles/Dashboard.css";
import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import Loading from "./Loading";

function Dash(props) {
  const { signedIn, handleUnauthorized } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState();
  const [classInfo, setClassInfo] = useState();
  const [intervalTime, setIntervalTime] = useState(0);
  const [format, setFormat] = useState("both");
  const reloadTime = 10000;

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
    }
    setQueue([]);
  };

  const removeUser = async (e) => {
    var eid = e.target.parentElement.parentElement.children[2].innerText;
    setQueue(queue.filter((user) => user.EID !== eid));

    var res;
    try {
      res = await fetch("/api/user", {method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({EID: eid, classCode : classInfo.classCode})});
      res = await res.text();
    } catch(err) {
        alert(res);
        return;
    }
  };

  const handleFormat = () => {
    console.log("format");
    const format = document.getElementById("format-dash").value;
    setFormat(format);

    fetch("/api/queue", {
      method: "SEARCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classCode: classInfo.classCode}),
    }).then(res => {
      res.json().then((data) => {
        var queue = data.Queue;
        if(document.getElementById("format-dash").value !== "both") {
          setQueue(queue.filter((user) => user.format === format));
        } else {
          setQueue(queue);
        }
      });
    }).catch(err => {
      alert(err);
      return;
    })

    
  }

  async function fetchData() {
    var classCode = await fetch("/api/classCode", { method: "GET" });
    classCode = await classCode.text();
    if (
      classCode === "User not found" ||
      classCode === "Internal server error"
    ) {
      handleUnauthorized();
      return;
    }

    var queue;
    try {
      var res = await fetch("/api/queue", {
        method: "SEARCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: classCode }),
      });
      res = await res.json();
      queue = res.Queue;
    } catch(err) {
      handleUnauthorized();
      return;
    }

    var classInfo;
    try {
      var res2 = await fetch("/api/classInfo", {
        method: "SEARCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: classCode }),
      });
      classInfo = await res2.json();
    } catch(err) {
      handleUnauthorized();
      return;
    }

    if(format === "online") {
      queue = queue.filter((user) => user.format === "online");
    } else if (format === "in-person") {
      queue = queue.filter((user) => user.format === "in-person");
    }
    
    setQueue(queue);
    setClassInfo(classInfo);
    setOpen(classInfo.active);
    setLoading(false);
  }

  useEffect(() => {
    const interval = setTimeout(() => {
    fetchData();
    setIntervalTime(reloadTime);
    }, intervalTime);
    return () => clearInterval(interval);
  });

  if (!signedIn) {
    return <Navigate to="/login" />;
  } 
  else if (loading) {
    return (<Loading width={"200px"}/>);
  }
  return (
    <div>
      <h1 className="course-text">{classInfo.classCode}</h1>
      <div className="class-info-container">
        <span className="num-people">
          <h2 className="num-people-text">Number of People: {queue.length}</h2>
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
        <select id="format-dash" className="input-dash" defaultValue={"none"} onChange={handleFormat}>
          <option value="none" disabled hidden>
            Format (optional)
          </option>
          <option value="online">online</option>
          <option value="in-person">in-person</option>
          <option value="both">both</option>
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
            {
              queue.map((person, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td rowSpan="2">
                        <span className="position">{index < 10 ? "0"+(index+1) : index+1}</span>
                      </td>
                      <td>{person.name}</td>
                      <td>{person.EID}</td>
                      <td>{person.format}</td>
                      <td rowSpan="2">
                        <ion-icon name="close-outline" onClick={removeUser}></ion-icon>
                      </td>
                    </tr>
                    <tr>
                      <td className="problem" colSpan="2">
                        {person.desc}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            }
            {/* <React.Fragment>
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
            </React.Fragment>

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
            </tr> */}
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

      <div className="clear-button-container">
        <button className="clear-button" onClick={deleteQueue}>Clear Queue</button>
      </div>
    </div>
  );
}

export default Dash;
