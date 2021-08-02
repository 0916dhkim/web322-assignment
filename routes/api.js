const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../model");
const router = express.Router();
const nodemailer = require("nodemailer");
const hbs = require("../hbs");
const {
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD,
  ROOT_URL,
} = require("../constants");

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

// Verify SMTP transporter is ready.
transporter.verify((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Ready to send emails.");
  }
});

router.use(express.json());

router.post("/signup", async (req, res) => {
  try {
    const userData = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };
    const user = new User(userData);
    await user.save();
    const welcomeHtml = await hbs.render("views/firststeps.handlebars", {
      firstname: req.body.firstname,
      redirect: `${ROOT_URL}/dashboard`,
    });

    await new Promise((resolve) =>
      transporter.sendMail(
        {
          from: EMAIL_FROM,
          to: req.body.email,
          subject: "Welcome to FairBNB",
          html: welcomeHtml,
          attachments: [
            {
              filename: "logo.png",
              path: `${ROOT_URL}/logo.png`,
              cid: "123",
            },
          ],
        },
        (err) => {
          if (err) throw err;
          resolve();
        }
      )
    );

    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log(user.password);
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.json({
        err: "Invalid status code.",
      });
    }
    // Login success.
    req.session.user = user;
    return res.send("Login success.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.get("/mailtest", async (req, res) => {
  try {
    const welcomeHtml = await hbs.render("views/firststeps.handlebars", {
      firstname: "John",
      redirect: "http://localhost:8082",
    });

    res.send(welcomeHtml);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});

module.exports = router;
