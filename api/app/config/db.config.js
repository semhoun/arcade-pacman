module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER ||"root",
  PASSWORD: process.env.DB_PASSWORD || "toor",
  DB: process.env.DB_NAME || "pacman"
};