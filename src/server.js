const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use("/api/podcast", require("./routes/podcast.routes"));
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server is running at PORT ${process.env.PORT || 5000}...`),
);
