import axios from "axios";

// export an object containing methods we'll use for accessing the nytimes API

export default {
  // Gets all books
  getNewArticles: function(searchTerms) {
    return axios.get("/api/newArticles", { params: searchTerms });
  },
  // Gets articles
  getArticles: function() {
    return axios.get("/api/articles/");
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
