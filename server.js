const express = require ("express");
const app = express();
const sql = require('mssql');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const sqlConfig = {
    user: 'arezoo',
    password: 'M@nti0431',
    database: 'ArezooDB',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const port = 3100;
const getData = async function () {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from chat`;
    return result.recordset;
}
const setData = function (nam, mes) {
    sql.connect(sqlConfig);
    sql.query`insert into chat ([name], [message]) values (${nam}, ${mes})`;
}

app.use("/", express.static("public"));

app.get("/getMessages", (req, res) => {
    getData().then(function(data){
        res.json({messages: data})
    });
})

app.post("/postMessage", (req, res) =>{
    nme = req.body.name;
    msg = req.body.message;
    setData(nme, msg);

    /*messageArray.push({"name": nme, "message": msg});
    console.log(messageArray);*/

    res.sendStatus(200);
})

app.listen(port);
console.log("server is listening on port " + port);