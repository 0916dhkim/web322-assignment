const express = require("express");
const router = express.Router();
const api = require("./api");
const getNavs = require("../getNavs");

router.use("/api", api);

router.get("/", (req, res) => {
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

router.get("/login", (req, res) => {
  res.render("login", {
    navs: getNavs("/login"),
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    navs: getNavs("/signup"),
  });
});

router.get("/explore", (req, res) => {
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

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  res.set("Cache-control", "no-store max-age=0");
  res.render("dashboard", {
    navs: getNavs("/dashboard"),
    firstname: req.session.user.firstname,
    lastname: req.session.user.lastname,
  });
});

module.exports = router;
