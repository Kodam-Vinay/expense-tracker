require("dotenv").config();
const express = require("express");
const expenseRouter = require("./Routes/expenseRouter");
const categoryRouter = require("./Routes/categoryRouter");

require("./db/connection");
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

app.use("/", expenseRouter, categoryRouter);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
