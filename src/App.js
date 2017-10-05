import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookCategory: '',
      search: '',
      books: []
    }
    this.handleKeywords = this.handleKeywords.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
    this.filterBooks = this.filterBooks.bind(this);
    this.handleCategory = this.handleCategory.bind(this)
  };

  // componentWillMount() {
  //   this.fetchBooks('javascript');
  // }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Super Duper Book Selection</h1>
        </header>
        <p>Choose a category:</p>
        <button onClick={this.handleCategory} value="javascript">Javascript - I want to study</button>
        <button onClick={this.handleCategory} value="cake">Cake - I want to bake!</button>
        <form>
          <input onChange={this.handleKeywords} type="text" placeholder="Filter your selection by..." value={this.state.search}></input>
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

  handleCategory(e) {
    console.log(e.target.value)
    e.preventDefault();
    this.setState({
      bookCategory: this.fetchBooks(e.target.value)
    });
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
