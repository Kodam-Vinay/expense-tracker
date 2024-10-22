require("dotenv").config();
const express = require("express");
const expenseRouter = require("./Routes/expenseRouter");
require("./db/connection");
const app = express();
const port = process.env.PORT || 8000;

app.use("/", expenseRouter);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
