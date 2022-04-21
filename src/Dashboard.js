import "./Dashboard.css";

function Dash() {
  return (
    <div>
      <h1 className="courseText">CS429</h1>
      <div className="container_dash">
        <table className="table_dash">
          <tr style={{border: "none"}}>
            <th></th>
            <th>Name</th>
            <th>EID</th>
            <th>Format</th>
          </tr>
          <tr>
            <td rowspan="2"><span className="position">01</span></td>
            <td>Cell 12</td>
            <td>Cell 13</td>
          </tr>
          <tr>
            <td colspan="2">This is my problemwoefniw efwn pf nowneonofwnepo nfwienon foiweinio nfowien oiqnoi enino</td>
          </tr>
          <tr>
            <td rowspan="2"><span className="position">02</span></td>
            <td>Cell 22</td>
            <td>Cell 23</td>
          </tr>
          <tr>
            <td colspan="2">Smal text here - 2</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Dash;
