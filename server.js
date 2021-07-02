const express = require("express");
const Sass = require("node-sass-middleware");
const path = require("path");
const morgan = require("morgan");
const hbs = require("./hbs");
const router = require("./routes");

const PORT = process.env.PORT || 8082;

const app = express();

// Template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Register middlewares.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  Sass({
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public", "styles"),
    prefix: "/styles",
  })
);
app.use(express.static("public"));

// Register routes.
app.use(router);

// Start server.
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Listening to http://localhost:${PORT}/`);
  }
});
