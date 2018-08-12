const express = require("express");
const app = express();

const firebase = require("firebase-admin");
const serviceAccount = {
  "type": "service_account",
  "project_id": "visual-vector",
  "private_key_id": process.env.priv_key_id,
  "private_key": process.env.priv_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_cert_url,
  "client_x509_cert_url": process.env.client_cert_url
}

// require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://visual-vector.firebaseio.com"
});

app.listen(4000);
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/about", function(request, response) {
  response.sendFile(__dirname + "/about.html");
});

app.post("/upvote", function(request, response) {
  changeVote(currentVote => currentVote + 1);
});

app.post("/downvote", function(request, response) {
  changeVote(currentVote => currentVote - 1);
});

function changeVote(votingFunc) {
  console.log("adding");
  const db = firebase.database();
  const ref = db.ref();

  ref.once("value")
     .then(snap => votingFunc(snap.val().votes))
     .then(newNum => ref.set({votes: newNum}));
}
