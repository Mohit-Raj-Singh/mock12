const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
            }
            else {
                const user = new userModel({ name, email, pass: secure_password });
                await user.save();
                res.send({ "msg": "User Register Successfully" })
            }
        });
    }
    catch (err) {
        res.send({ "msg": "Something Went Wrong." })
        console.log(err);
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await userModel.find({ email });
        const hased_pass = user[0].pass;
        if (user.length > 0) {
            bcrypt.compare(pass, hased_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ mock: "mock12" }, "mock12");
                    res.send({ "msg": "Login Successfully", "token": token });
                }
                else {
                    res.send("Wrong Credentials");
                }
            })
        }
    }
    catch (err) {
        res.send({ "msg": "Something Went Wrong." })
        console.log(err);
    }
})



userRouter.get("/getProfile/:id", async (req, res) => {
    const id=req.params.id;
    try {
        const user = await userModel.findOne({"_id":id});
        res.send(user);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = { userRouter };