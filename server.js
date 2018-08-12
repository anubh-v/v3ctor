const express = require("express");
const app = express();

const firebase = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.accJSON);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://visual-vector.firebaseio.com"
});

app.listen(process.env.PORT || 4000 );
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/about", function(request, response) {
  response.sendFile(__dirname + "/about.html");
});

app.post("/upvote", function(request, response) {
  changeVote(response, currentVote => currentVote + 1);
});

app.post("/downvote", function(request, response) {
  changeVote(response, currentVote => currentVote - 1);
});

app.post("/getvotes", function(request, response) {
  response.setHeader("Content-Type", "application/json");

  const db = firebase.database();
  const ref = db.ref();

  ref.once("value")
     .then(snap => response.send({votes: snap.val().votes}));
});

function changeVote(response, votingFunc) {
  const db = firebase.database();
  const ref = db.ref();

  ref.once("value")
     .then(snap => votingFunc(snap.val().votes))
     .then(newNum => {
       ref.set({votes: newNum})
       response.end();
     });
}
