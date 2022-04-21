import "./about.css";
import praveen from "./media/praveen.jpg";
import study from './media/study.svg'

function About() {
  return (
    <div className="about">
      <div className="section1_about" style={{ fontWeight: "bold" }}>
        <div className="flexContainer_about">
          <div
            style={{ color: "white", fontWeight: "bolder", fontSize: "72px" }}
          >
            Our Mission
          </div>
          <div className="break_about"></div>
          <div
            style={{ maxWidth: "70vw", textAlign: "center", color: "white" }}
          >
            Our mission is to help TAs and professors manage large queues of
            students during help hours. By providing a simple, easy to use
            interface, we hope to reduce the amount of time students spend
            waiting in line. Ultimately, we hope to create transparency in the
            process of helping students.
          </div>
        </div>
      </div>

      <div className="section2Overall_about">
        <div className="section2_about">
            <img src={study} alt="studying girl"></img>
        </div>

        <div className="section2a_about">
          <div
            className="findTextContainer_about"
            style={{
              verticalAlign: "top",
              display: "inline-block",
              maxWidth: "400px",
            }}
          >
            <p
              style={{
                marginBottom: "15px",
                fontSize: "55px",
                fontWeight: "bolder",
                color: "#0072FF",
              }}
            >
              About
            </p>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bolder",
                overflowX: "hidden",
              }}
            >
              This website was
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bolder" }}>
              created to unify help
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bolder" }}>
              hour websites among{" "}
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bolder" }}>
              different classes. We
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bolder" }}>
            are a group of students 
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bolder" }}>
            at the University of Texas
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bolder" }}>
            at Austin.
            </div>
          </div>
        </div>
      </div>

      <hr className="divide_about"></hr>

      <div className="section3_about">
        <p
          style={{
            fontWeight: "bolder",
            fontSize: "64px",
            marginBottom: "50px"
          }}
        >
          Meet the Team
        </p>
        <div className="flexContainer_about">
          <div className="profile_about">
            <img src={praveen} alt="Profile" />
            <div className="name_about">Praveen Mogan</div>
            <div className="role_about">Business</div>
          </div>

          <div className="profile_about">
            <img src={praveen} alt="Profile" />
            <div className="name_about">Praveen Mogan</div>
            <div className="role_about">Business</div>
          </div>

          <div className="profile_about">
            <img src={praveen} alt="Profile" />
            <div className="name_about">Praveen Mogan</div>
            <div className="role_about">Technology</div>
          </div>

          <div className="profile_about">
            <img src={praveen} alt="Profile" />
            <div className="name_about">Praveen Mogan</div>
            <div className="role_about">Technology</div>
          </div>

          <div className="profile_about">
            <img src={praveen} alt="Profile" />
            <div className="name_about">Praveen Mogan</div>
            <div className="role_about">Technology</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
