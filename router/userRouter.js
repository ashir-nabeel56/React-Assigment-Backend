const express = require("express");
const router = express.Router();
const Products = require("../data/product.json")

router.get("/",async(req,res)=>{
res.json(Products)
if(Products){

console.log("users products is available")
}else {
    console.log("products is not available")
}

})


module.exports =router