// @ts-check

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    // reject(new Error("Something failed..."));
    resolve(1);
  }, 2000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(err => console.log(err));

Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log(err));
