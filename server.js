var HTTP_PORT = process.env.PORT || 9000;
var routes = require('./src/api/routes/route');
var express = require("express")
var app = express();
routes(app);

//Start listening for requests
app.listen(HTTP_PORT, () => {
    console.log("KUDOS_API Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});