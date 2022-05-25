import "../Styles/Join.css";

function Join() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const classCode = document.getElementById("classCode-join").value;
    const EID = document.getElementById("EID-join").value;
    const format = document.getElementById("format-join").value;
    const name = document.getElementById("name-join").value;
    const desc = document.querySelector("textarea").value;
    const email = document.getElementById("email-join").value;
    if (!(EID && format !== "none" && EID && name && email)) {
      alert("Please fill out all fields");
      return;
    }
    console.log(classCode, EID, format, name, desc);
    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        classCode: classCode,
        EID: EID,
        format: format,
        name: name,
        desc: desc,
        email: email,
      }),
    })
      .then((res) => {
        res.text().then((res) => {
          alert(res);
          document.getElementById("classCode-join").value = "";
          document.getElementById("EID-join").value = "";
          document.getElementById("format-join").value = "none";
          document.getElementById("name-join").value = "";
          document.querySelector("textarea").value = "";
          document.getElementById("email-join").value = "";
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container-join">
        <h1>Join a Queue</h1>
        <div className="break"></div>
        <form className="form-join" onSubmit={handleSubmit}>
          <input
            id="name-join"
            className="input-join"
            type="text"
            placeholder="Name"
            style={{ marginRight: "10%" }}
          />
          <input
            id="classCode-join"
            className="input-join"
            type="text"
            placeholder="Class code"
          />
          <br />
          <input
            id="EID-join"
            className="input-join"
            type="text"
            placeholder="EID"
            style={{ marginRight: "10%" }}
          />
          <input
            id="email-join"
            className="input-join"
            type="email"
            placeholder="Email"
            multiple
          />
          <br />
          <select id="format-join" className="input-join" defaultValue={"none"}>
            <option value="none" disabled hidden>
              Format
            </option>
            <option value="online">online</option>
            <option value="in-person">in-person</option>
          </select>
          <br />
          <br />
          <textarea
            name="paragraph-text"
            rows="10"
            placeholder="Describe your problem here..."
          ></textarea>
          <br />
          <div className="email-notification">
            *Please seperate names and emails with commas, if multiple
          </div>
          <button className="button-join">Join a Queue</button>
        </form>
      </div>
    </div>
  );
}

export default Join;
