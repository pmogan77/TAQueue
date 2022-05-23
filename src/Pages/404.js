import "../Styles/404.css";
import error from "../media/error.svg";

function Error() {
  return (
    <div className="error">
      <img className="error-image" src={error} alt="404" />
    </div>
  );
}

export default Error;
