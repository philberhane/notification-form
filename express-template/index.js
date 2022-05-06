const express = require("express");
const request = require("request");
var cors = require("cors");

const app = new express();
app.use(express.json());
app.use(cors());

function parseSupervisors(data) {
  let formattedSupervisors = [];
  data = JSON.parse(data);
  const supervisors = data.sort((a, b) => {
    if (a.jurisdiction !== b.jurisdiction) {
      return a.jurisdiction > b.jurisdiction ? 1 : -1;
    } else if (a.lastName !== b.lastName) {
      return a.lastName > b.lastName ? 1 : -1;
    } else {
      return a.firstName > b.firstName ? 1 : -1;
    }
  });
  supervisors.forEach((supervisor) => {
    const formattedSupervisor =
      supervisor.jurisdiction +
      " - " +
      supervisor.lastName +
      ", " +
      supervisor.firstName;
    formattedSupervisors.push(formattedSupervisor);
  });
  return formattedSupervisors;
}

app.get("/supervisors", (req, res) => {
  request(
    "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers",
    function (error, response) {
      if (!error && response.statusCode == 200) {
        res.send(parseSupervisors(response.body));
      } else {
          res.send({error:"Sorry, your request cannot be processed at this time. Please try again later."})
      }
    }
  );
});

app.post("/submit", (req, res) => {
  if (req.body.firstName.length === 0 || req.body.lastName.length === 0 || req.body.supervisor.length === 0 || req.body.supervisor === "Select...") {
      res.send({error:"Please fill all of the required fields."})
  } else {
      console.log(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.supervisor)
      res.send({success:"Your submission has been completed!"})
  }
});

app.listen(8080, () => {
  console.log("Listening on 8080. Ctrl+c to stop this server.");
});
