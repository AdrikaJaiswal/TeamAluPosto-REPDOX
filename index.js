const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// app.use("/auth", require("./src/routes/auth"));
// app.use("/lending", require("./src/routes/lending"));
// app.use("/borrowing", require("./src/routes/borrowing"));
// app.use("/transport", require("./src/routes/transport"));
// app.use("/users", require("./src/routes/users"));

// app.use(require("./src/middleware/error.middleware"));

app.get("/", (req, res) => {
    res.send("KrishiLink Backend Running");
});

app.get("/test", (req, res) => {
    res.json({ message: "Backend is working" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});