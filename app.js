//import express
import express from "express";
//import mongoose
import mongoose from "mongoose";
// import routes
import route from "./routes/index.js";
//import cors
import cors from "cors";
// construct express function
const app = express();

// connect ke database mongoDB
mongoose.connect("mongodb://localhost:27017/restful_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connected"));

// middleware
app.use(cors());
app.use(express.json());
app.use("/product", route);

// listening to port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running at port: ${port}`));
