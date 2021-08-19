import React from "react";
import "./App.css";
import Shelf from "./components/Shelf";
//import axios from "axios";
import SearchPage from "./components/SearchPage";
import { getAll } from "./BooksAPI";
import Route from "./components/Route";
import Link from "./components/Link";

/*NOTE: I only used the getAll and search endpoints from the provided books API
the rest of the logic to update the shelf and to move the books from the search page
to the user's shelves is written by myself in vanilla JS. I've left comments in the code
to help you better understand the code, but in case of any confusion, let me know. */
class BooksApp extends React.Component {
  state = {
    books: []
  };

  onclick = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", "/search");
  };

  async componentDidMount() {
    const response = await getAll();
    this.setState({ books: response });
  }
  //This function is called when the user changes the shelf control on an individual book. 
  onBookShelfUpdate = (book) => {
    //booksOnShelf contains the unique IDs of all the books.
    //It used further in the code to check if the book already exists on the shelf or not. 
    const booksOnShelf = this.state.books.map((item) => {
      return item.id;
    });
    //This condition is triggered if the book is already on one of the user's shelf
    if (booksOnShelf.includes(book.props.id)) {
      const index = this.state.books.findIndex(
        (element) => element.id === book.props.id
      );
      let newArray = [...this.state.books];
      newArray[index] = { ...newArray[index], shelf: book.state.status };
      this.setState({ books: newArray });
    }
    //This condition is triggered if the book isn't already on the shelf
    //i.e. it's a new addition to one of the shelves.  
    else {
      const newBook = {
        ...this.state.books[0],
        id: book.props.id,
        title: book.props.title,
        shelf: book.state.status,
        authors: [book.props.author],
        imageLinks: { thumbnail: book.props.link.slice(4, -2) },
      };
      let newArray = [...this.state.books, newBook];
      this.setState({ books: newArray });
    }
  };

  render() {
    return (
      <div className="app">
        <Route path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  name={"Currently Reading"}
                  books={this.state.books}
                  type={"currentlyReading"}
                  onBookShelfUpdate={this.onBookShelfUpdate}
                />
                <Shelf
                  name={"Want To Read"}
                  books={this.state.books}
                  type={"wantToRead"}
                  onBookShelfUpdate={this.onBookShelfUpdate}
                />
                <Shelf
                  name={"Read"}
                  books={this.state.books}
                  type={"read"}
                  onBookShelfUpdate={this.onBookShelfUpdate}
                />
              </div>
            </div>
            <div className="open-search">
              <Link href="/search">Add a book</Link>
            </div>
          </div>
        </Route>
        <Route path="/search">
          <SearchPage
            myBooks={this.state.books}
            onBookShelfUpdate={this.onBookShelfUpdate}
            onFormSubmit={this.onFormSubmit}
          />
        </Route>
      </div>
    );
  }
}

export default BooksApp;
