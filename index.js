const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/userRoutes");
const { connection } = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors(
    {origin:"*"}
));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home")
})

app.use("/users", userRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected");
    }
    catch (err) {
        console.log("Error in Server");
        console.log(err);
    }
    console.log(`Server is running on ${process.env.port}`);
})