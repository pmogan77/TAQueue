import "../Styles/Remove.css";

function Remove() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const classCode = document.getElementById("classCode-remove").value;
    const EID = document.getElementById("EID-remove").value;
    fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classCode: classCode, EID: EID }),
    })
      .then((res) => res.text())
      .then((res) => {
        alert(res);
        document.getElementById("classCode-remove").value = "";
        document.getElementById("EID-remove").value = "";
      });
  };

  return (
    <div>
      <div className="container-remove">
        <h1>Remove Self</h1>
        <div className="break"></div>
        <form className="form-remove" onSubmit={handleSubmit}>
          <input
            id="classCode-remove"
            className="input-remove"
            type="text"
            placeholder="Class Code"
            name = "classCode"
            style={{ marginRight: "0%" }}
          />
          <input
            id="EID-remove"
            className="input-remove"
            type="text"
            placeholder="EID"
            name = "EID"
          />
          <br />
          <button className="button-remove">Remove</button>
        </form>
      </div>
    </div>
  );
}

export default Remove;
