const express = require("express");
const router = express.Router();
const Course = require("../models/Course.model");
const fileUpload = require("../config/cloudinary");

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
}

//Upload image cloudinary
router.post("/upload", fileUpload.single("image"), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Get all courses
router.get("/courses", async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json(allCourses);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Create course
router.post("/courses", async (req, res) => {
  const { courseType, slug, name } = req.body;
  if (!name || !courseType) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  try {
    const response = await Course.create({
        courseType,
        slug,
        name
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Delete course
router.delete("/courses/:id", async (req, res) => {
  try {
    await Course.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: `id ${req.params.id} was deleted` });
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Get course by id
router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Update course
router.put("/courses/:id", async (req, res) => {
  try {
    const { name, courseType } = req.body;
    await Course.findByIdAndUpdate(req.params.id, {
      name,
      courseType,
    });
    res.status(200).json(`id ${req.params.id} was updated`);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

module.exports = router;
