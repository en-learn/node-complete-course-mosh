const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch(err => console.error("Could not connect to mongodb", err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: Number,
  date: { type: Date, default: Date.now },
});

const Courses = mongoose.model("Courses", courseSchema);

async function getCourses() {
  return await Courses.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
