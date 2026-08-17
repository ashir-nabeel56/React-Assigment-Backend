const express = require("express");
const router = express.Router();
const BySlide =require("../data/bySlide.json")

router.get("/",async(req,res)=>{
res.json(BySlide)
})






module.exports =router