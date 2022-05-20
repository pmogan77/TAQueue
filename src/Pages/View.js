import "../Styles/View.css";

function View() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const classCode = document.getElementById("classCode-view").value;
    const format = document.getElementById("format-view").value;
    console.log(classCode, format);
  };

  return (
    <div>
      <h1 className="view-text">View Queue</h1>
      <form className="form-view" onSubmit={handleSubmit}>
        <input
          id="classCode-view"
          className="input-view"
          type="text"
          placeholder="Class code"
          style={{ marginRight: "40px" }}
        />
        <select id="format-view" className="input-view" defaultValue={'none'}>
          <option value="none" disabled hidden>
            Format
          </option>
          <option value="online">online</option>
          <option value="in-person">in-person</option>
        </select>
        <br />
        <button className="button-view">View Queue</button>
      </form>

      <div className="meeting-link"><a href="http://google.com" target="_blank">Meeting Link</a></div>
      <div className="container-view">
        {/* create a table with a name and format column and numbers in front */}
        <table className="table-view">
          <thead>
            <tr style={{border: "none"}}>
              <th></th>
              <th>Name</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="position">01</span>
              </td>
              <td>John</td>
              <td>online</td>
            </tr>
            <tr>
              <td>
                <span className="position">02</span>
              </td>
              <td>Jane</td>
              <td>in-person</td>
            </tr>
            <tr>
              <td>
                <span className="position">03</span>
              </td>
              <td>Bob</td>
              <td>in-person</td>
            </tr>
            <tr>
              <td>
                <span className="position">04</span>
              </td>
              <td>Mary</td>
              <td>online</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
