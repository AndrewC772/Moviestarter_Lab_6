/*
 Authors:
 Your name and student #: A00959080
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs').promises;

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index", { movie_list_return: "" }));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let myform_body = req.body;
  console.log(myform_body);
  let movie_list = myform_body.movie_list;
  console.log(movie_list)
  movies_split = movie_list.split(',')
  todo_movie_list = ["Inception", "Spiderman", "The Dark Knight", "Tenet"]
  if (movies_split.length >= 1) {
    res.render("pages/index", { movie_list_return: movies_split })
  } else {
    res.render("pages/index", { movie_list_return: todo_movie_list })
  }
  
  });
  

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  console.log(req.query)
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let todo_movie_list = [movie1, movie2]
  res.render("pages/index", { movie_list_return: todo_movie_list })
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movieName = req.params.movieName
  return new Promise((resolve, reject) => {
    fs.readFile("movieDescriptions.txt", "utf8")
      .then((data) => {      
        new_list = data.split("\n")
        for (let i = 0; i < new_list.length; i++) {
          movie_name_desc = new_list[i].split(":")
          name_test = String(movie_name_desc[0]).toLowerCase()
          if (name_test.includes(String(movieName).toLowerCase()) == true) {
            console.log(movie_name_desc)
            res.render("pages/searchResult", { search_result: movie_name_desc})
          } else {
            res.render("pages/searchResult", { search_result: "Movie could not be found" })
          }
        }
      })
      .catch((err) => console.log(err))
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});