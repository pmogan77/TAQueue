import "../Styles/Schedule.css";

function Schedule() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const classCode = document.getElementById("classCode-schedule").value;
    console.log(classCode);
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
          />
          <br />
          <button className="button-schedule">See Schedule</button>
        </form>
      </div>

      <div className="image-schedule-container">
        <p>No Image to show</p>
        <img
          className="schedule"
          src="https://i.imgur.com/7m1ApZD.png"
          alt="schedule"
        ></img>
      </div>
    </div>
  );
}

export default Schedule;
