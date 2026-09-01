const express = require("express");
const router = express.Router();
const Products = require("../data/product.json")

router.get("/",async(req,res)=>{
if(Products){
    res.json(Products)
    console.log("users products is available")
}else {
    res.status(404).json({message: "products is not available"})
}

})


module.exports =router