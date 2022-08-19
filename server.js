const express = require ("express");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const port = 3100;
messageArray = [];

app.use("/", express.static("public"));

app.get("/getMessages", (req, res) => {
    res.json({messages: messageArray})
})

app.post("/postMessage", (req, res) =>{
    const msg = req.body.message;
    messageArray.push(msg);
    res.sendStatus(200);
})

app.listen(port);
console.log("server is listenong on port " + port);