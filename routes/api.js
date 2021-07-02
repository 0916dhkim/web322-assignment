const express = require("express");
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
