const express = require("express");
const app = express();

require("dotenv").config();


const PORT = process.env.PORT || 3000;


// middle ware

app.use(express.json());


const blog = require("./routes/blog")

// mount
app.use("/api/v1" , blog);

const connectdb = require("./config/database");
connectdb();

// start the server

app.listen(PORT, () => {
    console.log(`App is Statred at Port no ${PORT}`);
})

app.get("/" , (req,res) => {
    res.send(`<h1>This is my Home Page Baby</h1>`)
})
