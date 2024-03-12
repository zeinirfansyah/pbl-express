import express from "express";
import dontenv from "dotenv";

import router from "./routes/routes";

dontenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send(`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`);
})

app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}`);
});

app.use(express.json());
app.use(router)