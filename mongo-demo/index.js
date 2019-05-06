const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  // This validation is at the mongoose level, not mongodb
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    require: true,
    enum: ["web", "mobile", "network"],
    // match: //
  },
  author: String,
  tags: {
    type: Array,
    // validate: {
    //   validator: async function(v) {
    //     return setTimeout(() => {
    //       return (result = v && v.length > 0);
    //     }, 1000);
    //   },
    //   message: "A course should have at least one tag.",
    // },
    // The 'isAsync' parameter is deprecated!
    // But it makes error handling simpler...
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
        // Do some async work
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    category: "-",
    // tags: ["angular", "frontend"],
    isPublished: true,
    price: 12,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find()
    // .or([{ author: "Mosh" }, { isPublished: true }])
    // .find({ author: /^Mosh/ })
    // .find({ author: /Hamedani$/i })
    // .find({ author: /.*Mosh.*/ })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

async function run() {
  await createCourse();
}

run();
