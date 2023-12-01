const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

//twilio cred
const accountSid = "AC64f1927e2a5c2fd0c21e804597fc54df";
const authToken = "10dfa72b0105d2240015e1c6ebabccac";
const client = require("twilio")(accountSid, authToken);

app.use(cors());
app.use(express.json());

// Update express.urlencoded middleware to set the extended option explicitly
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("welcome bro");
});
router.post("/", (req, res) => {
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: "Please type ' join series-first' to join our chat",
      to: `whatsapp:+91${req.body.phoneNumber}`,
    })
    .then((message) => {
      console.log(message.sid);
      res.send( 'Connection successfull with')
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(404)
    });
});

app.use("/", router);
app.listen(5000, () => {
  console.log("listening on 5000");
});
