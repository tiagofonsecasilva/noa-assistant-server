const express = require("express");
const router = express.Router();
const News = require("../models/News.model");
const fileUpload = require("../config/cloudinary");

//Get all courses
router.get("/news", async (req, res) => {
  try {
    const allNews = await News.find();
    res.status(200).json(allNews);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});



module.exports = router;
