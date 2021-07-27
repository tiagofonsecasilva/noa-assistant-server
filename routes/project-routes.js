const express = require("express");
const router = express.Router();
const Project = require("../models/Project.model");
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

//Get all projects
router.get("/projects", async (req, res) => {
  try {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Create project
router.post("/projects", async (req, res) => {
  const { title, description, imageUrl } = req.body;
  if (!title || !description) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  try {
    const response = await Project.create({
      title,
      description,
      imageUrl
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Delete project
router.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: `id ${req.params.id} was deleted` });
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Get project by id
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Update project
router.put("/projects/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    res.status(200).json(`id ${req.params.id} was updated`);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

module.exports = router;
