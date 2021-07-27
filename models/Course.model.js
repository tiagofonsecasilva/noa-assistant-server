const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseType: String,
    slug: String,
    name: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
