import learn from "../media/learn.svg";
import {useState} from "react";
import '../Styles/index.css'
import { Link } from "react-router-dom";

function Home() {

  const [opened, setOpened] = useState([false, false, false, false]);

  return (
    <div className="home">
      <div className="section1" style={{ font_weight: "bold" }}>
        <div className="flex-container">
          <div className="intro-text-container">
            <p className="help">Help Hours Made Easy</p>
            <p className="automate">Automate your workflow.</p>
          </div>

          <div className="image1-container">
            <img src={learn} alt="Train Illustration" />
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="flex-container">
          <div className="enter-text-container" style={{maxWidth: "900px"}}>
            <p style={{fontWeight: "bolder", fontSize: "50px", marginBottom: "20px"}}>
              Simply enter a <span style={{color: "white"}}>class code </span>
              and <span style={{color: "white"}}> EID</span>
            </p>
          </div>
          <div className="break"></div>
          <div className="visit-btn-container">
            <Link to="/join">
              <button style={{width: "50vw", borderRadius: "10px", fontWeight: "bold", padding: "10px"}} type="button">
                Join A Queue
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="section3">
        <div className="flex-container">
          <h1 id="FAQ">Frequently Asked Questions</h1>
          <div className="break"></div>
          <div className="faq-container">
            <div className="faq">
              <div className="preview" onClick={() => setOpened([!opened[0], opened[1], opened[2], opened[3]])} style={{color: opened[0] ? "#0072FF" : "black"}}>
                <p>What is a class code?</p>
                <ion-icon name={opened[0] ? "remove-outline" : "add-outline"}></ion-icon>
              </div>
              <div className="answer">{opened[0] ? `Your instructor will provide a classcode to join the designated queue. If you are unable to find the code, please contact your instructor or TA.` : ""}</div>
            </div>

            <div className="faq">
              <div className="preview" onClick={() => setOpened([opened[0], !opened[1], opened[2], opened[3]])} style={{color: opened[1] ? "#0072FF" : "black"}}>
                <p>How do I join the queue?</p>
                <ion-icon name={opened[1] ? "remove-outline" : "add-outline"}></ion-icon>
              </div>
              <div className="answer">{opened[1] ? `You can join a queue by clicking the join tab. From there, fill in the corresponding information. Finally, hit submit and wait tight until it is your turn to join the queue.` : ""}</div>
            </div>

            <div className="faq">
              <div className="preview" onClick={() => setOpened([opened[0], opened[1], !opened[2], opened[3]])} style={{color: opened[2] ? "#0072FF" : "black"}}>
                <p>How do I view the queue?</p>
                <ion-icon name={opened[2] ? "remove-outline" : "add-outline"}></ion-icon>
              </div>
              <div className="answer">{opened[2] ? `You can view the queue by clicking the view tab. If you're on a tight schedule, we recommend checking this tab out before joining the queue.` : ""}</div>
            </div>

            <div className="faq">
              <div className="preview" onClick={() => setOpened([opened[0], opened[1], opened[2], !opened[3]])} style={{color: opened[3] ? "#0072FF" : "black"}}>
                <p>How do I remove myself from a queue?</p>
                <ion-icon name={opened[3] ? "remove-outline" : "add-outline"}></ion-icon>
              </div>
              <div className="answer">{opened[3] ? `First, click the remove self tab. Then, enter in your UT EID and classcode. Finally, hit submit.` : ""}</div>
            </div>
           
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
