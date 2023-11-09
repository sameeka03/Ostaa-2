 // Name- Sameeka Maroli
// Task: Getting the database schema set up, responding to various types of queries, adding new users and items, etc. 

function getGet(){
  //Works for get and search methods in the url using fetch api
  let path="/get/"
  req = fetch(path);//fetching url
      req.then((response) => {
          return response.text();
        })
      .then((text) => {
        document.getElementById("ostaa").innerHTML=text;//returning output

      })
      
}

function addItem(){ // a function to add items to the mongo database on the server using POST requests
  var price = document.getElementById("cost").value;
  var status = document.getElementById("status").value;
  var title = document.getElementById("title").value;
  var desc = document.getElementById("desc").value;
  var img = document.getElementById("image").value;
  var owner = document.getElementById("owner").value;
  let path = "/add/item/" + owner;
  req = fetch(path ,{
    method: 'POST',
      body: JSON.stringify({
          title: title,
          description: desc,
          image: img,
          price: price,
          stat: status,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      }
    });

    // ensures the tetx dissapears after submitting
  req.then((response) => {
      console.log("Request was a Success");
      document.getElementById("title").value="";
      document.getElementById("desc").value="";
      document.getElementById("image").value="";
      document.getElementById("cost").value="";
      document.getElementById("status").value="";
      document.getElementById("owner").value="";

      }
  )
}

// this function parses users data into JSON and adds it to the database using POST
function addUser(){
  var user = document.getElementById("user").value;
  var pwd = document.getElementById("pwd").value;
  let path = "/add/user/";
  req = fetch(path ,{
    method: 'POST',
      body: JSON.stringify({
      username: user,
      password: pwd,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      }
    });
    
    // ensures the text dissapears after submitting
    req.then((response) => {
      console.log("successful");
      document.getElementById("user").value="";
      document.getElementById("pwd").value="";
      }
  )
}

function welcomeMessage(user) {
  document.getElementById("welcometxt").innerHTML = "Welcome, " + user + ". What would you like to do?";
}


function loadHomePage(){    
  window.location.href="home.html";
}

function loadPostPage(){
  window.location.href="post.html";
}

function getListings(keyword) { 
    let url = "/search/items/" + keyword; // Correct the URL
    fetch(url)
        .then((response) => response.json())
        .then((listings) => {
            listings.forEach(listing => {
                var newElement = document.createElement("div");
                var textNode = document.createTextNode("Item: " + listing.title); // Change this to display the data you need
                newElement.appendChild(textNode);
                // Append newElement to the DOM where you want to display the listings
            });
        });
}

function getUsers(){
    //Works for get and search methods in the url using fetch api
    var username = document.getElementById("user").value;
    var pwd = document.getElementById("pwd").value;
    let path = "/get/users"
    req = fetch(path);//fetching url
        req.then((response) => {
            return response.json();
          })
        .then((users) => {
          var handshake = true;
          users.forEach(user=> {
            if (user.username === username && user.password === pwd){
              handshake = true;
            }
          })
          console.log()
          if (handshake){
            const message="You are now Logged In";
            document.getElementById("message").innerHTML=message;
            setInterval(loadHomePage,2000);
            clearInterval(setInterval(loadHomePage,2000));
            
            targetElement.parentNode.replaceChild(newElement, targetElement);
            welcomeMessage(username)
          }
          else if(!handshake){
            const message="Error: Failed to Login";
            document.getElementById("message").innerHTML=message;
          }
        })
}



