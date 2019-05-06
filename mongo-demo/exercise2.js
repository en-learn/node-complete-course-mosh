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
  date: { type: Date, default: Date.now },
  price: Number,
});

const Courses = mongoose.model("Courses", courseSchema);

async function getCourses() {
  return await Courses.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourses().catch(err =>
    console.error("There was an error", err)
  );
  console.log(courses);
}

run();
