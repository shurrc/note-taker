const express = require('express');
const path = require('path');
const htmlRoutes = require("./routes/htmlroutes");
const apiRoutes = require("./routes/apiroutes")


const PORT = process.env.port || 3001;

const app = express();




// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
