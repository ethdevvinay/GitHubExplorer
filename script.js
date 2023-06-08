document.getElementById("searchButton").addEventListener("click", function() {
  var usernameInput = document.getElementById("usernameInput");
  var username = usernameInput.value.trim();

  if (username !== "") {
    getUserDetails(username)
      .then(function(data) {
        updateUI(data);
      })
      .catch(function(error) {
        console.error(error);
        displayErrorMessage("An error occurred while fetching user details.");
      });
  }
});

function getUserDetails(username) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/" + username);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = function() {
      reject(Error("Network Error"));
    };
    xhr.send();
  });
}

function updateUI(data) {
  document.getElementById("avatar").src = data.avatar_url;
  document.getElementById("name").textContent = data.name || data.login;
  document.getElementById("bio").textContent = data.bio || "No bio available";
  document.getElementById("followers").textContent = "Followers: " + data.followers;
  document.getElementById("repos").textContent = "Repositories: " + data.public_repos;
  document.getElementById("profileLink").href = data.html_url;
  document.getElementById("profileLink").textContent = "Visit Profile";
}

function displayErrorMessage(message) {
  var errorElement = document.createElement("p");
  errorElement.className = "error";
  errorElement.textContent = message;
  document.getElementById("userContainer").appendChild(errorElement);
}
