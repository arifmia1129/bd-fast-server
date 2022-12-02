const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initial route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/html/index.html")
})

// route not found 
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})


// error handling route
app.use((err, req, res, next) => {
    res.status(500).json({
        success: true,
        message: "Something broken"
    })
})

module.exports = app;