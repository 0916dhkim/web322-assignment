require("dotenv").config();

const {
  ROOT_URL,
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD,
} = process.env;

module.exports = {
  ROOT_URL,
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD,
};
