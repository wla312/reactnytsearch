import axios from "axios";

// export an object containing methods we'll use for accessing the nytimes API

export default {
  // Gets all nyt articles that fit the search parameters
  getNewArticles: function(searchTerms) {
    return axios.get("/api/newArticles", { params: searchTerms });
  }
};
