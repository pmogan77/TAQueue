import "../Styles/Schedule.css";
import { useState } from "react";
import Loading from "./Loading";

function Schedule() {
  const [schedule, setSchedule] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const classCode = document.getElementById("classCode-schedule").value;
    console.log(classCode);
    setSchedule(undefined);
    setLoading(true);
    var scheduleData;
    try {
      var res = await fetch("/api/classInfo", {
        method: "SEARCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: classCode }),
      });
      scheduleData = await res.json();
      scheduleData = scheduleData.schedule;
    } catch (err) {
      alert("Unable to load schedule");
      return;
    }
    setLoading(false);
    setSchedule(scheduleData);
  };

  return (
    <div>
      <div className="container-schedule">
        <h1>Schedule</h1>
        <div className="break"></div>
        <form className="form-schedule" onSubmit={handleSubmit}>
          <input
            id="classCode-schedule"
            className="input-schedule"
            type="text"
            placeholder="Class Code"
            name = "classCode"
          />
          <br />
          <button className="button-schedule">See Schedule</button>
        </form>
      </div>

      <div className="image-schedule-container">
        {
          loading && <Loading />
        }
        {
          schedule === "" ? (<p>No Image to show</p>) : (schedule !== undefined) ? (<img
              className="schedule"
              src={schedule}
              alt="schedule"
            ></img>) : (null)
        }
        
        
      </div>
    </div>
  );
}

export default Schedule;
