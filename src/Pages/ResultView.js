function ResultView(props) {
    const {meeting, queue} = props;

    if(meeting === undefined || queue === undefined) {
        return null;
    }

    return (
        <div>      
          {meeting === "" ? null : 
          <div className="meeting-link">
            <a href={meeting} target="_blank" rel="noreferrer">
              Meeting Link
            </a>
          </div>}
          <div className="table-container-view">
            <table className="table-view">
              <thead>
                <tr style={{ border: "none" }}>
                  <th></th>
                  <th>Name</th>
                  <th>Format</th>
                </tr>
              </thead>
              <tbody>
                  {queue.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <span className="position">{index < 10 ? "0"+(index+1) : index+1}</span>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.format}</td>
                        </tr>
                    ))}
                {/* <tr>
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
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default ResultView;