require("dotenv").config();
const express = require("express");
const tmi = require("tmi.js");

const app = express();
const port = 3000;

const options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: process.env.BOT_USER,
    password: process.env.BOT_PASS
  },
  channels: [process.env.BOT_CHANNEL]
};
const client = new tmi.client(options);

app.get("/ch/:channelName", function(req, res) {
  var channelName = req.params.channelName;
  client.connect();
  var modList = [];
  client.on("connected", (address, port) => {
    return client
      .mods(channelName)
      .then(data => {
        console.log(data);
        client.disconnect();
        res.json(data);
      })
      .catch(err => {
        console.error(err);
        res.send("could not find mods");
      });
  });
});

app.get("/", (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
