const express = require('express');
const axios=require("axios");
const { response } = require('express')
const router = express.Router();

router.get("/news", async (req, res, next) => {

try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=989b144b80a349acbf503349fc783ad9");
    res.status(200).json(response.data);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
})

module.exports=router;