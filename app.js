const express = require("express");
const BookRouter = require("./modules/book");
const taskRouter = require("./modules/task");
const authRouter = require("./modules/auth");
const filesRouter = require("./modules/files");
const { connectDb, middlewares, sessionConfig } = require("./config");
const path = require('path');

const openReactApp = (req, res) => {
 return res.sendFile(path.join(__dirname, "..", "public", "index.html"))
}

async function start() {
  try {
    const { PORT } = process.env;
    const app = express();
    // db
    await connectDb();
    // middlewares
    middlewares(app);
    sessionConfig(app);
    // routes
    authRouter(app);
    BookRouter(app);
    taskRouter(app);
    filesRouter(app);

    app.get("*",openReactApp)

    app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = start;
