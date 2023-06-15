import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import cors from 'cors'

dotenv.config();
mongoose
  .connect("mongodb+srv://piyush:SdDuxxrjzHhuBilx@cluster0.arlr7hz.mongodb.net/indikartproject?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to Mongdbdb");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.use("/api/upload", uploadRouter);

app.use("/api/seed", seedRouter);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
