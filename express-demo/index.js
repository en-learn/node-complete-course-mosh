const debug = require("debug")("app:startup");
const config = require("config");
const express = require("express");
const log = require("./middleware/logger");
const auth = require("./middleware/authenticator");
const helmet = require("helmet");
const morgan = require("morgan");

const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use("/api/courses", courses);
app.use("/", home);

app.use(log);
app.use(auth);

// Configuration
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
console.log(`Mail Password: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// PORT
const port = process.env.PORT || 3010;
app.listen(port, () => console.log(`Listening on port ${port}...`));
