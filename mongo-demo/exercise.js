// Get all the published backend courses
// Sort them by their name
// Pick only their name and author
// and display them

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch(() => console.error("Could not connect to mongodb"));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: Number,
  isPublished: Boolean,
  date: { type: Date, default: Date.now },
});

const Courses = mongoose.model("Courses", courseSchema);

async function getCourses() {
  return await Courses.find({ isPublished: true, tags: "backend" })
    .sort("name")
    .select({ author: 1, name: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
