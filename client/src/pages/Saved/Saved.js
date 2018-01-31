import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Saved extends Component {
  state = {
    savedArticles: [],
    snippet: "",
    headline: "",
    pubDate: "",
    url: ""
  };
  // Add code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {

    // Load articles from DB
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles: res.data, headline: "", snippet: "", pubDate: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  handleDeleteArticle = id => {

    // delete an article when delete button is clicked
    console.log("delete button clicked");
    console.log(id);

    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }  

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Saved Articles
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <div className="panel-body">
              {this.state.savedArticles.length ? (
                <ul className="list-group">
                  {this.state.savedArticles.map(article => {
                    return (
                    <li className="list-group-item" key={article._id}>
                      <p><strong>{article.headline}</strong></p>
                      <p>{article.snippet}</p>
                      <p>Publication Date: {article.pubDate}</p>
                      <a rel="noreferrer noopener" href={article.url} target="_blank">Go to article</a>
                      <button className="btn btn-danger" onClick={() => this.handleDeleteArticle(article._id)}>Delete</button>
                    </li>
                    )
                  })}
                </ul>
              ) : (<h1 className="text-center">No articles saved</h1>)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Home</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
