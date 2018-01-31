import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYr: "",
    endYr: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    console.log(this.state);

    const searchTerms = {
      topic: this.state.topic,
      startYr: this.state.startYr,
      endYr: this.state.endYr
    }

    // get new articles from the NYT site and set state with results...
    API.getNewArticles(searchTerms)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ articles: res.data.docs, error: ""});
      })
      .catch(err => this.setState({ error: err.message }));
  };

  handleSaveArticle = article => {

    // save an article when save button is clicked
    API.saveArticle({
        headline: article.headline.main,
        snippet: article.snippet,
        pubDate: article.pub_date,
        url: article.web_url
      })
        .then(res => alert("article saved"))
        .catch(err => console.log(err))
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search NYT Articles</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYr}
                onChange={this.handleInputChange}
                name="startYr"
                placeholder="Start Year (Optional)"
              />
              <Input
                value={this.state.endYr}
                onChange={this.handleInputChange}
                name="endYr"
                placeholder="End Year (Optional)"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
              <div className="panel-body">
                {this.state.articles.length ? (
                  <ul className="list-group">
                    {this.state.articles.map(article => {
                      return (
                      <li className="list-group-item" key={article._id}>
                        <p><strong>{article.headline.main}</strong></p>
                        <p>{article.snippet}</p>
                        <p>Publication Date: {article.pub_date}</p>
                        <a rel="noreferrer noopener" href={article.web_url} target="_blank">Go to article</a>
                        <button className="btn btn-primary" onClick={() => this.handleSaveArticle(article)}>Save</button>
                      </li>
                      )
                    })}
                  </ul>
                ) : (<h1 className="text-center">No articles, try a new search!</h1>)}
              </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
