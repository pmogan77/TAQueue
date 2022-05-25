const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var admin = require("firebase-admin");
var cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

var privateKey = process.env.PRIVATE_KEY;
var privateKeyId = process.env.PRIVATE_KEY_ID;
var clientEmail = process.env.CLIENT_EMAIL;
var clientID = process.env.CLIENT_ID;
var clientCert = process.env.CLIENT_X509_CERT_URL;

var serviceAccount = {
  type: "service_account",
  project_id: "ta-queue-5552c",
  private_key_id: "006a3d079de73a5242d81f8f3b0947ef8ffbcee8",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8c8A9smiO3e5/\nJsVvHNisadig19FTjZzgqAoYymRtR+RoqZigZvWdXUsMoiCeJDit5rwze5rvs4wP\nHaaGec+E3Y0hV0RRhEiaaBDZOb1vlNsmK1/c2D6meBoyQRlEQoeQR8PMvBx3PIvd\nYuEZkFuNwgkdg1OaVhi3Tij3ahVtAXmAFWlDORvgFtyMxdhzUeOtK8fDSj7++/DZ\ndUDvRkdp9h0PCPqj/GOKt3UL9WhqfZ7RK5OZAO7ZpmZFaAdL5kVa7tqsH4BDgYdc\nYla8GH5bPRoKCj6tT9RsPwWH7Ftt684EQfjYcQmD+z2dgiRxWTY/6ReLzHemaaGv\n42Qmz/sFAgMBAAECggEAJ7pfNKJ/2F6BAN0zkhEKvI4z1PSqdGrOP64tMry4HzGg\nvU/DlU0fSmV4hNlI9w27xS13T4MnTpETXbxqdr8HOINcVUMIbAbvJ13471J01SkU\nah+Kvgv4aS+4lg+TPAiqe4glhuvBNIHXGnzV54W/R0s4kLg2z7qGy1321PHQQoJI\nbJU46NzfLdcRIAjS5in1WnImW0A0PHvY72Ek6WPqUHE7B23IJyGKD/WdfJhnnjmA\n6VEw1+2EWGULQrYSXdK5NHwwzOSC19zQxY0hfBQahM4Da2IKOZCQz0ETJ1ObcrzM\nfPL3FVjlbeRBhHE7BZN3TWO4Ivy7m5UXgyiEVM8MoQKBgQDiRMmoetVRdTeqlFpq\nT/9SncJmCgtSYS54KeZs5XuKmBvNoy8Nb6YzoTNTINiGHltYabymDj8wefcoXR+s\nZmVmvL8xU5IN6LQwu5vf996bhuuMSly0Ex/dwO+LemRpwD+Cy7gf05wARhERMUVY\nIBljbeFJ2vO12nmcXTsrwAg+EwKBgQDVNuR7AATFn6z2i5RvyY0NyqPrVTbt3RjS\ndKunhWdaKdaKQgjGuIes2Hmnu5GdPuuXu3FoaD+pztWREjVJeyAXQghuCEJx+ijv\nadG/YPQ9+fXK8YgVIlzVnclHy0sd4f6561GXpFUPC6HYqF6a+kOWUzwHFNB7YTI5\nWS3J3lelhwKBgQCG9obegt4Ip4Vbrv+7WBowej9BRA56xdLFBCEYpU0qXw5+ey6O\nsiENvMJzfC0K2sKbmv5Wgjr4vFdLcTh6Sd2ECWN1laaRu1L3moAgeKYEWNbZKGXh\nV2Lzj6iSpp+MYIrBhqg9+6ealjCJ87ysEwFxyFHQDtS9jSJqvUWVFAcWlwKBgDMZ\nq9ra30nqAg841sOP/7FtfqnZS4fotJlEAxvsOh/+5P9P4kCWW1YOr+GGb9jLCrXb\n48tNKOzuuHrDbWgGDWPlnJWafypH9WWj6/Q9LWxpKwKPrri5+pvr7CC71W39CwrO\nHkkExqoLdKezerEUB/zQSBO+ZlUbr2jVOccm9cSjAoGAHwv5Y6/TdZqmrOJTOdQ1\nJ9pqT/GZinSb4eFRLh6tWjqaH+iLZH4UJGtEuZSkTZ+YMIcjOJuJMGRgWnEW4vcn\nsuSWiUGsHQm/on2/FAx6uFmkoFt4Oeym1FLi/VQ5CGPb6Tc/Lys8W01W1WjFKcPA\nL338LaU/Sz6vheGP1o6lvEE=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-k20e3@ta-queue-5552c.iam.gserviceaccount.com",
  client_id: "117595744228915374127",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k20e3%40ta-queue-5552c.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "helphoursqueue@gmail.com",
    pass: process.env.APP_PASS,
  },
});

if(process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
  });
}

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(cookieParser(",oU<jO~ZtrF.,vA"));

app.use(express.json());

const validateUser = async function (token, classCode) {
  var result = {
    valid: false,
    uid: "",
  };

  console.log("validateUser: " + token);

  var uid;
  try {
    uid = await auth.verifyIdToken(token);
    uid = uid.sub;
  } catch (error) {
    console.log(error);
    return result;
  }

  var doc;
  try {
    doc = await db.collection("Users").doc(uid).get();
  } catch (error) {
    console.log(error);
    return result;
  }

  console.log(doc.data().classCode + " vs. " + classCode);

  return { valid: doc.data().classCode == classCode, uid: uid };
};

const sendEmail = function (name, EID, classCode, email, position, form) {
  function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  position = ordinal_suffix_of(position);
  const viewLink = "https://help-hours.herokuapp.com/view";
  var data = fs.readFileSync(`./src/email/${form}.html`, "utf8");
  data = data.replaceAll("{{COURSE_NAME}}", classCode);
  data = data.replaceAll("{{ COURSE_NAME }}", classCode);
  data = data.replaceAll("{{NAME}}", name);
  data = data.replaceAll("{{ student_name }}", name);
  data = data.replaceAll("{{ remove_code }}", EID);
  data = data.replaceAll("{{view_link}}", viewLink);
  data = data.replaceAll("{{POSITION}}", position);
  console.log(data);

  transporter
    .sendMail({
      from: "helphoursqueue@gmail.com", // sender address
      to: email, // list of receivers
      subject: `Notification from ${classCode} Help Hours Queue`, // Subject line
      html: data, // html body
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

app.get("/api/test", (req, res) => {
  // validateUser(req.signedCookies.token, "test").then((result) => {
  //     console.log(result);
  // });
  // db.collection("Classes").doc("test").get().then((doc) => {
  //     console.log({active: doc.data().active, schedule: doc.data().schedule, meeting: doc.data().meeting});
  //     res.send({active: doc.data().active, schedule: doc.data().schedule, meeting: doc.data().meeting});
  // });
  // validateUser(req.signedCookies.token, "test").then((result) => {
  //     console.log(result);
  //     if(!result.valid) {
  //         console.log("Invalid user");
  //         res.status(401).send("Unauthorized");
  //         return;
  //     }
  //     // check if uid matches with classcode
  //     db.collection("Users").doc(result.uid).get().then((doc) => {
  //         if(doc.data().classCode != "test") {
  //             // console.log("Invalid class code");
  //             res.status(401).send("Unauthorized");
  //             return;
  //         }
  //         console.log("Valid user");
  //         db.collection("Classes").doc("test").get().then((doc2) => {
  //             console.log({Queue: doc2.data().Queue});
  //             res.json({Queue: doc2.data().Queue});
  //         });
  //     }).catch((error) => {
  //         console.log(error);
  //         res.status(500).send("Internal server error");
  //     })
  // }).catch((error) => {
  //     console.log(error);
  //     res.status(500).send("Internal server error");
  // })
  res.send("Test successful");
});

app.search("/api/classInfo", (req, res) => {
  console.log(req.body);
  db.collection("Classes")
    .doc(req.body.classCode)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.send({
          active: doc.data().active,
          schedule: doc.data().schedule,
          meeting: doc.data().meeting,
          classCode: req.body.classCode
        });
      } else {
        res.status(404).send("Class not found");
      }
    });
});

app.search("/api/queuePublic", (req, res) => {
  db.collection("Classes")
    .doc(req.body.classCode)
    .get()
    .then((doc) => {
      if (doc.exists) {
        var result = { Queue: [] };

        doc.data().Queue.forEach((entry) => {
          result.Queue.push({
            name: entry.name,
            format: entry.format,
          });
        });
        console.log("Queue: " + result.Queue);
        res.json(result);
      } else {
        res.status(404).send("Class not found");
      }
    });
});

app.search("/api/queue", (req, res) => {
  // authenticate user and match user against
  validateUser(req.signedCookies.token, req.body.classCode)
    .then((result) => {
      console.log(result);
      if (!result.valid) {
        console.log("Invalid user");
        res.status(401).send("Unauthorized");
        return;
      }

      // check if uid matches with classcode
      db.collection("Users")
        .doc(result.uid)
        .get()
        .then((doc) => {
          if (doc.data().classCode != req.body.classCode) {
            console.log("Invalid class code");
            res.status(401).send("Unauthorized");
            return;
          }

          console.log("Valid user");
          db.collection("Classes")
            .doc(req.body.classCode)
            .get()
            .then((doc2) => {
              console.log({ Queue: doc2.data().Queue });
              res.json({ Queue: doc2.data().Queue });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).send("Internal server error");
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
});

app.get("/api/classCode", (req, res) => {
  // get uid from token
  auth
    .verifyIdToken(req.signedCookies.token)
    .then((decodedToken) => {
      // get class code from uid
      db.collection("Users")
        .doc(decodedToken.sub)
        .get()
        .then((doc) => {
          if (doc.exists) {
            res.send(doc.data().classCode);
          } else {
            res.status(404).send("User not found");
          }
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
});

app.delete("/api/user", (req, res) => {
  db.collection("Classes")
    .doc(req.body.classCode)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).send("Class not found");
        return;
      }

      var queue = doc.data().Queue;
      // filter out all elements which have same req.body.EID
      var size = queue.length;
      var first = queue[0];
      queue = queue.filter((entry) => entry.EID != req.body.EID);
      if (queue.length == size) {
        res.status(404).send("User not found");
        return;
      }

      // send email to next user if first in line is deleted
      if (first != queue[0]) {
        console.log("send email to new first");
        // name, EID, classCode, email, position, form
        sendEmail(queue[0].name, queue[0].EID, req.body.classCode, queue[0].email, 1, "first");
      }

      db.collection("Classes")
        .doc(req.body.classCode)
        .update({ Queue: queue })
        .then((result) => {
          res.send("Successfully deleted user from queue");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
});

app.delete("/api/class", (req, res) => {
  validateUser(req.signedCookies.token, req.body.classCode)
    .then((result) => {
      console.log(result);
      if (!result.valid) {
        console.log("Invalid user");
        res.status(401).send("Unauthorized");
        return;
      }

      // check if uid matches with classcode
      db.collection("Users")
        .doc(result.uid)
        .get()
        .then((doc) => {
          if (doc.data().classCode != req.body.classCode) {
            console.log("Invalid class code");
            res.status(401).send("Unauthorized");
            return;
          }

          console.log("Valid user");

          // delete the class information
          db.collection("Classes").doc(req.body.classCode).delete();

          // delete the user linkage
          db.collection("Users").doc(result.uid).delete();

          // delete the user
          auth
            .deleteUser(result.uid)
            .then(() => {
              res.clearCookie("token");
              res.send("Successfully deleted class");
            })
            .catch((error) => {
              console.log(error);
              res.status(500).send("Internal server error");
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
});

const clearQueue = async function (classCode) {
  try {
    await db.collection("Classes").doc(classCode).update({
      Queue: [],
    });
  } catch (error) {
    console.log(error);
  }
};

app.delete("/api/queueClear", (req, res) => {
  validateUser(req.signedCookies.token, req.body.classCode)
    .then((result) => {
      console.log(result);
      if (!result.valid) {
        console.log("Invalid user");
        res.status(401).send("Unauthorized");
        return;
      }

      // check if uid matches with classcode
      db.collection("Users")
        .doc(result.uid)
        .get()
        .then((doc) => {
          if (doc.data().classCode != req.body.classCode) {
            console.log("Invalid class code");
            res.status(401).send("Unauthorized");
            return;
          }

          console.log("Valid user");
          clearQueue(req.body.classCode)
            .then(() => {
              res.send("Queue cleared");
            })
            .catch((error) => {
              console.log(error);
              res.status(500).send("Internal server error");
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
});

app.post("/api/auth", (req, res) => {
  let options = {
    maxAge: 1000 * 60 * 60 * 8, // would expire after 8 hours
    // httpOnly: true, // The cookie only accessible by the web server
    secure: true,
    signed: true,
  };

  if (req.body.Token != null || req.body.Token != undefined) {
    res.cookie("token", req.body.Token, options);
  } else {
    console.log("clearing cookie");
    res.clearCookie("token");
  }

  res.end("updated user token");
});

const addIfValid = async function (classCode, EID, format, name, email, desc) {
  // check if queue exists
  var doc;
  try {
    doc = await db.collection("Classes").doc(classCode).get();
  } catch (error) {
    console.log(error);
    return { add: false, message: "Can't find class" };
  }

  if (!doc.exists) {
    return { add: false, message: "Can't find class" };
  }

  if (!doc.data().active) {
    return { add: false, message: "Queue is paused" };
  }

  for (var i = 0; i < doc.data().Queue.length; i++) {
    if (doc.data().Queue[i].EID == EID) {
      return { add: false, message: "Already in queue" };
    }
  }

  await db
    .collection("Classes")
    .doc(classCode)
    .update({
      Queue: admin.firestore.FieldValue.arrayUnion({
        EID: EID,
        name: name,
        email: email,
        format: format,
        desc: desc,
      }),
    });

  console.log("Send add to queue email");
  sendEmail(name, EID, classCode, email, doc.data().Queue.length + 1, "add");

  if (doc.data().Queue.length == 0) {
    console.log("send up next email");
    sendEmail(name, EID, classCode, email, 1, "first");

  }

  return { add: true, message: "Added to queue" };
};

app.post("/api/user", (req, res) => {
  addIfValid(
    req.body.classCode,
    req.body.EID,
    req.body.format,
    req.body.name,
    req.body.email,
    req.body.desc
  ).then(({ add, message }) => {
    res.send(message);
  });
});

app.post("/api/editClass", (req, res) => {
  console.log("Open: " + req.body.active);
  validateUser(req.signedCookies.token, req.body.classCode)
    .then((result) => {
      console.log(result);
      if (!result.valid) {
        console.log("Invalid user");
        res.status(401).send("Unauthorized");
        return;
      }

      // check if uid matches with classcode
      db.collection("Users")
        .doc(result.uid)
        .get()
        .then((doc) => {
          if (doc.data().classCode != req.body.classCode) {
            console.log("Invalid class code");
            res.status(401).send("Unauthorized");
            return;
          }

          console.log("Valid user");

          var update = {};
          if (req.body.meeting != null && req.body.meeting !== undefined) {
            update.meeting = req.body.meeting;
          }

          if (req.body.schedule != null && req.body.schedule !== undefined) {
            update.schedule = req.body.schedule;
          }

          if (req.body.active != null && req.body.active !== undefined) {
            update.active = req.body.active;
          }

          db.collection("Classes")
            .doc(req.body.classCode)
            .update(update)
            .then(() => {
              res.send("Successfully updated class");
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
});

app.get("*", function (req, res) {
  res.end("No get pathway found.");
});

app.post("*", function (req, res) {
  res.end("No post pathway found.");
});

app.put("*", (req, res) => {
  res.end("No put pathway found.");
});

app.delete("*", (req, res) => {
  res.end("No delete pathway found.");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
