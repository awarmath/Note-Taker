//require dependencies
const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// add data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//imports routes for api and html
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//add listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
