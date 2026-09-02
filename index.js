const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./router/authroutes");
const productRoutes = require("./router/productsroute");
const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB on startup
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Home
app.get("/", (req, res) => {
  res.send("E-Commerce Backend is running");
});

// Vercel ke liye - Serverless function as export
module.exports = app;

// Local development ke liye
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 1000;
  app.listen(PORT, () => {
    console.log(`BACKEND IS RUNNING AT PORT ${PORT}`);
  });
}
















// const express = require("express");
// const app = express();
// var cors = require('cors')

// const dotenv = require("dotenv");
// dotenv.config()
// app.use(cors())
// const PORT = process.env.PORT || 7000
// const bySlide = require("./router/bySlide")
// const Products = require("./router/userRouter")
// app.use("/products",Products)

// app.use("/bySlide",bySlide)
// app.get ("/",(req,res)=>{
//     res.send("hello world")
// })
// app.listen(PORT,()=>{
// console.log(`BACKEND IS RUNNING AT PORT ${PORT}`);

// })

