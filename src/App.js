import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      books: []
    }
    this.handleKeywords = this.handleKeywords.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
    this.filterBooks = this.filterBooks.bind(this);
  };

  componentWillMount() {
    this.fetchBooks('cake');
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Super Duper Book Selection</h1>
        </header>
        <form>
          <input onChange={this.handleKeywords} type="text" placeholder="Enter keywords..." value={this.state.search}></input>
        </form>
        <div>
          {this.filterBooks().map((book) => {
            return (
            <div>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book" />
              <p>{book.volumeInfo.title}</p>
            </div>
            );
          })}
        </div>
      </div>
    );
  }

  handleKeywords(e) {
    console.log(e.target.value)
    e.preventDefault();
    this.setState({
      search: e.target.value
    });
  }

  fetchBooks(query) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
    .then((resBuffer) => resBuffer.json())
    .then((res) => {
      this.setState({
        books: res.items
      });
    })
    .catch(console.log);

  }

  filterBooks() {
    return this.state.books.filter((book) => {
      return book.volumeInfo.title.toLowerCase().includes(this.state.search.toLowerCase());
    });

  }

}

export default App;
