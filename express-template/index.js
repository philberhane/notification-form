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

app.get("/supervisors", async (req, res) => {
  request(
    "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(parseSupervisors(response.body));
      }
    }
  );
});

app.post("/echo", async (req, res) => {
  try {
    res.json({
      body: req.body,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

app.listen(8080, () => {
  console.log("Listening on 8080. Ctrl+c to stop this server.");
});
