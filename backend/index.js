// backend/index.js
const express = require('express');
const cors = require("cors");
const config = require('./config');
const mainRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(config.port);