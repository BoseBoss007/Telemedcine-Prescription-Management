const express = require("express");
const path = require("path");
const session = require("express-session");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const { connectToDatabase } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "telemedicine-case-study-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30
    }
  })
);
app.use((req, res, next) => {
  const cookieHeader = req.headers.cookie || "";
  const cookieMap = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [key, ...rest] = entry.split("=");
        return [key, decodeURIComponent(rest.join("="))];
      })
  );

  req.cookies = cookieMap;
  next();
});
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", prescriptionRoutes);

app.use((req, res) => {
  res.status(404).render("failure", {
    title: "Page Not Found",
    message: "The page you requested does not exist."
  });
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Telemedicine Prescription Management app running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
