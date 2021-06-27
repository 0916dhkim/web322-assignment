const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD,
} = require("./config");

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
    console.log("Ready send emails.");
  }
});

router.use(express.json());

router.post("/signup", (req, res) => {
  console.log("Signing up", req.body);
  transporter.sendMail(
    {
      from: EMAIL_FROM,
      to: req.body.email,
      subject: "Welcome to FairBNB",
      html: "Test message.",
    },
    (err) => {
      console.log("error", err);
      if (err) {
        res.status(500).json({
          err: err.message,
        });
      } else {
        res.json("OK");
      }
    }
  );
});

module.exports = router;
