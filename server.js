import http from "http";
import express from "express";
import logger from "morgan";

// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";

//middleware
import {decode} from './middlewares/jwt.js';

const app = express();

const port = process.env.PORT || "3000";
app.set("port", port);

// logging and dev stuff
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// route endpoints
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

// catch other endpoints
app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});




