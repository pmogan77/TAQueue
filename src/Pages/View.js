import "../Styles/View.css";
import { useState } from "react";
import ResultView from "./ResultView";
import Loading from "./Loading";

function View() {
  const [meeting, setMeeting] = useState();
  const [queue, setQueue] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    
    e.preventDefault();
    const classCode = document.getElementById("classCode-view").value;
    const format = document.getElementById("format-view").value;
    console.log(classCode, format);
    setLoading(true);
    setMeeting(undefined);
    
    var queueData;
    try {
      var res = await fetch("/api/queuePublic", {
        method: "SEARCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: classCode }),
      });
      queueData = await res.json();
      queueData = queueData.Queue;
    } catch (err) {
      alert("Unable to load queue");
      setLoading(false);
      return;
    }

    var meetingData;
    try {
      var res2 = await fetch("/api/classInfo", {
        method: "SEARCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: classCode }),
      });
      meetingData = await res2.json();
      meetingData = meetingData.meeting;
    } catch (err) {
      alert("Unable to load meeting info");
      setLoading(false);
      return;
    }

    console.log("Format is: "+format);
    if(format === "online") {
      queueData = queueData.filter(item => item.format === "online");
    } else if(format === "in-person") {
      queueData = queueData.filter(item => item.format === "in-person");
    }

    console.log(queueData);
    console.log(meetingData);
    setLoading(false);
    setMeeting(meetingData);
    setQueue(queueData);

    setInterval(function(){
      /// call your function here
      console.log("Refreshing queue: "+classCode);
    }, 10000);
  };

  return (
    <div>
      <div className="container-view">
        <h1 className="view-text">View Queue</h1>
        <form className="form-view" onSubmit={handleSubmit}>
          <input
            id="classCode-view"
            className="input-view"
            type="text"
            placeholder="Class code"
            name="classCode"
            style={{ marginRight: "40px" }}
            required
          />
          <select id="format-view" className="input-view" defaultValue={"none"}>
            <option value="none" disabled hidden>
              Format (optional)
            </option>
            <option value="online">online</option>
            <option value="in-person">in-person</option>
            <option value="both">both</option>
          </select>
          <br />
          <button className="button-view">View Queue</button>
        </form>
      </div>
      {loading && (<Loading/>)}
      <ResultView meeting={meeting} queue={queue}></ResultView>
    </div>
  );
}

export default View;
