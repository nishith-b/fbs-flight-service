const express = require("express");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  const { City, Airport } = require("./models");
  const city = await City.findByPk(11);
  console.log(city);
  //const dbairport = await city.createAirport({
    //name: "Punk",
    //code: "KM",
 // });
  const airp = await city.getAirports();
  console.log(airp);
  const hbar = await Airport
});
