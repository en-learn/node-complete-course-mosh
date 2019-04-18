// @ts-check
// console.log("Before");
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log("Commits: ", commits))
//   .catch(err => console.log("Error: ", err.message));
// console.log("After");

// Async and Await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error", err.message);
  }
}
displayCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      // resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("Could not get the repos"));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}

// console.log("Before");
// getUser(1, getUserRepositories);
// console.log("After");

// function getUser(id, callback) {
//   console.log("Reading a user from the database...");
//   setTimeout(() => {
//     callback({ id: id, gitHubUsename: "mosh" });
//   }, 2000);
// }

// function getUserRepositories(user) {
//   getRepositories(user.gitHubUsename, displayRepos);
// }

// function getRepositories(username, callback) {
//   console.log(`Getting repositories for user ${username}...`);
//   setTimeout(() => {
//     callback(["repo1, repo2"]);
//   }, 2000);
// }

// function displayRepos(repos) {
//   console.log("Repos: ", repos);
// }
