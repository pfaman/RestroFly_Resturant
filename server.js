import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './Routes/User.js'

const app = express();

// MiddleWares
app.use(express.json()); 
app.use(cors());
app.use(morgan("dev"));

// .env setup
config({ path: "./.env" });

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Resturant App" });
});

// User Route
app.use("/api/user",userRoute)

// DB Setup
mongoose.connect(
  process.env.MONGODB_URL,{
    dbName : "RestroFly_Resturant_App"
  }
).then(()=> {
  console.log("Connected to Resturant App Database")
}).catch((err) =>{
    console.log("Database connection error:", err);
});

// Port from env or fallback
const PORT = 3000;

app.listen(PORT, () =>{
  console.log(`Server is running on http://localhost:${PORT}`);
});