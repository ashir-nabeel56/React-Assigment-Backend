const express = require("express");
const app = express();
var cors = require('cors')
const dotenv = require("dotenv");
dotenv.config()
app.use(cors())
const PORT = process.env.PORT || 7000
const bySlide = require("./router/bySlide")
const Products = require("./router/userRouter")
app.use("/products",Products)

app.use("/bySlide",bySlide)
app.get ("/",(req,res)=>{
    res.send("hello world")
})
app.listen(PORT,()=>{
console.log(`BACKEND IS RUNNING AT PORT${PORT}`);

})