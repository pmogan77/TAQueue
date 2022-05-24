import "../Styles/Settings.css";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function Settings(props) {
  const { signedIn, handleUnauthorized } = props;
  const [meeting, setMeeting] = useState();
  const [schedule, setSchedule] = useState();

  useEffect(() => {
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

      // need to call /api/classInfo to get meeting info
      var meetingData;
      var scheduleData;
      try {
        var res = await fetch("/api/classInfo", {
          method: "SEARCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classCode: classCode }),
        });
        var classInfo = await res.json();
        meetingData = classInfo.meeting;
        scheduleData = classInfo.schedule;
      } catch (err) {
        alert(err);
        return;
      }

      setMeeting(meetingData);
      setSchedule(scheduleData);
    }
    fetchData();
  });

  const editClass = async (e) => {
    e.preventDefault();
    const meeting = document.getElementById("meeting-settings").value;
    const schedule = document.getElementById("schedule-settings").value;
    var classCode = await fetch("/api/classCode", { method: "GET" });
    classCode = await classCode.text();
    if (
      classCode === "User not found" ||
      classCode === "Internal server error"
    ) {
      handleUnauthorized();
      return;
    }
    console.log(meeting, schedule, classCode);
    const result = await fetch("/api/editClass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meeting: meeting,
        schedule: schedule,
        classCode: classCode,
      }),
    });
    const res = await result.text();
    console.log(res);
    if (res === "Unauthorized") {
      alert("Session has expired. Please log in again.");
      handleUnauthorized();
    } else {
      alert("Class updated!");
    }
  };

  const deleteClass = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }
    console.log("deleting class");
    var classCode = await fetch("/api/classCode", { method: "GET" });
    classCode = await classCode.text();
    if (
      classCode === "User not found" ||
      classCode === "Internal server error"
    ) {
      handleUnauthorized();
      return;
    }
    var res = await fetch("/api/class", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classCode: classCode }),
    });
    res = await res.text();
    console.log(res);
    if (res === "Unauthorized") {
      alert("Session has expired. Please log in again.");
      handleUnauthorized();
    } else {
      window.location.href = "/";
    }
  };

  if (!signedIn) {
    return <Navigate to="/login" />;
  } else if (meeting === undefined || schedule === undefined) {
    return (
      <Loading width={"200px"}/>
    );
  }
  return (
    <div>
      <div className="container-settings">
        <h1>Settings</h1>
        <div className="break"></div>
        <form className="form-settings" onSubmit={editClass}>
          <input
            id="meeting-settings"
            className="input-settings"
            type="url"
            placeholder="Meeting URL"
            name="meeting"
            style={{ marginRight: "0%" }}
            defaultValue={meeting}
          />
          <input
            id="schedule-settings"
            className="input-settings"
            type="url"
            placeholder="Schedule Image URL"
            name="schedule"
            defaultValue={schedule}
          />
          <br />
          <button className="change-settings">Change</button>
        </form>
        <button className="delete-settings" onClick={deleteClass}>
          Delete Class
        </button>
      </div>
    </div>
  );
}

export default Settings;
