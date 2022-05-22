import "../Styles/Signup.css";
import { getDoc, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

function Signup(props) {  
  const {auth, db, setSignedIn} = props;
  const validateCode = async (classCode) => {
    // determine whether classCode is not present in database

    const ref = doc(db, "Classes", classCode);
    const checkDoc = await getDoc(ref);
    return typeof checkDoc.data() == "undefined";
  };

  const handleSignup = async (classCode, password, url, meeting) => {
    // create user in database
    const email = classCode + "@taqueue.com";
    var userCredential;
    try{
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode+" : "+errorMessage);
      return;
    }

    console.log("Succesfully created user account");
    
    // Signed in 
    const user = userCredential.user;

    try{
      await setDoc(doc(collection(db, "Users"), user.uid), {classCode: classCode});
    } catch(error) {
      alert(error);
      return;
    }

    console.log("Linked user to class");

    try{
      await setDoc(doc(collection(db, "Classes"), classCode), {active: true, schedule: url, meeting: meeting, Queue: []});
    } catch(error) {
      alert(error);
      return;
    }

    console.log("Added class information to database");

    console.log(user);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch(error) {
      alert(error);
      return;
    }

    var token;
    try{
      token = await auth.currentUser.getIdToken();
    } catch(error) {
      alert(error);
      return;
    }


    try{
      var res = await fetch('/api/auth', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({Token: token})})
      res = await res.text();
      console.log(res);
      setSignedIn(true);
    } catch(error) {
      alert(error);
      return;
    }
    
    window.location.href = "/dashboard";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const classCode = document.getElementById("classCode-signup").value;
    const password = document.getElementById("password-signup").value;
    const url = document.getElementById("image-url-signup").value;
    const meeting = document.getElementById("meeting-url-signup").value;

    if(!(classCode && password && url && meeting)) {
      alert("Please fill out all fields");
      return;
    }

    validateCode(classCode).then((result) => {
      if(!result) {
        alert("Class code already exists");
        return;
      }
      handleSignup(classCode, password, url, meeting);
    });
  };

  return (
    <div>
      <div className="container-signup">
        <h1>Signup</h1>
        <div className="break"></div>
        <form className="form-signup" onSubmit={handleSubmit}>
          <input
            id="classCode-signup"
            className="classCode-signup"
            type="text"
            placeholder="Class code"
            style={{ marginRight: "0%" }}
          />
          <input
            id="password-signup"
            className="input-signup"
            type="password"
            placeholder="Password"
          />
          <br />
          <input
            id="image-url-signup"
            className="image-url-signup"
            type="url"
            placeholder="Schedule Image URL"
          />
          <input
            id="meeting-url-signup"
            className="meeting-url-signup"
            type="url"
            placeholder="Meeting URL"
          />
          <div className="links-notification">*If there are multiple links, please use Linktree</div>
          <button className="button-signup2">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
