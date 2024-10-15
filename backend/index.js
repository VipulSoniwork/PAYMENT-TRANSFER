// backend/index.js
const express = require('express');
const cors = require("cors");
const config = require('./config');
const mainRouter = require("./routes/index");

const app = express();

app.use(cors({
    origin: 'https://sturdy-journey-975v5wjx969c764v-5173.app.github.dev', // or specify your frontend URL for security
}));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});