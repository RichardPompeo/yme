const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/web/public"));

require("./api/controller/index")(app); // Initializing API
require("./web/routes/routes")(app); // Initializing Server

app.listen(3000);

console.log("Server is ready");
