// we require the express module
const express = require("express");
// we create an instance  of our express server
const app = express();
// we set up our routes
const cartItems = require("./cartItems.routes");
// require cors
const cors = require("cors");

app.use(cors());
// since we're going to be dealing with json data, we need the below line
app.use(express.json());
// we set up our express app to use the endpoints from our cartItems route file
app.use("/", cartItems);

// declare our port number, then ask our app to listen on it to run our server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}.`)
})