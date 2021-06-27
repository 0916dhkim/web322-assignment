const express = require("express");
const ExpressHandlebars = require("express-handlebars");
const Sass = require("node-sass-middleware");
const path = require("path");
const getNavs = require("./getNavs");
const api = require("./api");

const PORT = process.env.PORT || 8082;

const app = express();

// Template engine.
app.engine("handlebars", ExpressHandlebars());
app.set("view engine", "handlebars");

// Register middlewares.
app.use(
  Sass({
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public", "styles"),
    prefix: "/styles",
  })
);
app.use(express.static("public"));

app.use("/api", api);

// Routes.
app.get("/", (req, res) => {
  res.render("home", {
    navs: getNavs("/"),
    cities: [
      "Toronto",
      "Vancouver",
      "Montreal",
      "Ottawa",
      "Calgary",
      "Edmonton",
      "Halifax",
      "Winnipeg",
    ],
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    navs: getNavs("/login"),
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    navs: getNavs("/signup"),
  });
});

app.get("/explore", (req, res) => {
  res.render("explore", {
    navs: getNavs("/explore"),
    rooms: [
      {
        name: "Chiado Loft 7 with Patio!",
        imageUrl: "/images/room001.jpg",
        rate: 130,
        rating: 4.87,
        ratingCount: 363,
        superhost: true,
        type: "Entire Apartment",
        city: "Lisbon",
      },
      {
        name: "Chiado Loft 7 with Patio!",
        imageUrl: "/images/room001.jpg",
        rate: 130,
        rating: 4.87,
        ratingCount: 363,
        superhost: true,
        type: "Entire Apartment",
        city: "Lisbon",
      },
      {
        name: "Chiado Loft 7 with Patio!",
        imageUrl: "/images/room001.jpg",
        rate: 130,
        rating: 4.87,
        ratingCount: 363,
        superhost: true,
        type: "Entire Apartment",
        city: "Lisbon",
      },
      {
        name: "Chiado Loft 7 with Patio!",
        imageUrl: "/images/room001.jpg",
        rate: 130,
        rating: 4.87,
        ratingCount: 363,
        superhost: true,
        type: "Entire Apartment",
        city: "Lisbon",
      },
      {
        name: "Chiado Loft 7 with Patio!",
        imageUrl: "/images/room001.jpg",
        rate: 130,
        rating: 4.87,
        ratingCount: 363,
        superhost: true,
        type: "Entire Apartment",
        city: "Lisbon",
      },
      {
        name: "Chiado Loft 7 with Patio!",
        imageUrl: "/images/room001.jpg",
        rate: 130,
        rating: 4.87,
        ratingCount: 363,
        superhost: true,
        type: "Entire Apartment",
        city: "Lisbon",
      },
    ],
  });
});

// Start server.
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Listening to http://localhost:${PORT}/`);
  }
});
