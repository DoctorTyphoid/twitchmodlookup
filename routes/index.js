require("dotenv").config();
const express = require("express");
const router = express.Router();
const tmi = require("tmi.js");

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

function ModLookup(channelName) {
  client.connect();

  client.on("connected", (address, port) => {
    client
      .mods(process.env.BOT_CHANNEL)
      .then(data => {
        console.log(data);

        client.part(channelName);
        return data;
      })
      .catch(err => {
        console.log(err);
        return "could not find mods!";
      });
  });
}

router.get("/ch/:channelName", function(req, res) {
  res.send(ModLookup(channelName));
});

module.exports = router;
