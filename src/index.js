const express = require("express");
const apiRoutes = require('./routes')
const { PORT } = require("./config");

const app = express();

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Successfully started the server on PORT : ${PORT}`);
});
