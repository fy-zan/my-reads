import React from "react";
import { search } from "../BooksAPI";
import Book from "./Book";
import Link from "./Link";

class SearchPage extends React.Component {
  state = { term: "", books: [] };
  showBooks() {
    //Creating two separate arrays of IDs and shelves of the books in the shelves (in order)
    const myBooksIDs = this.props.myBooks.map(book => {
      return book.id;
    });
    const myBooksShelves = this.props.myBooks.map(book => {
      return book.shelf;
    });
    /*Checking if the books in the results are aleady present in the shelves or not.
    If they are, I update their shelves accordingly, otherwise set it to none.*/
    const updatedBooks = this.state.books.map(book => {
      if (myBooksIDs.indexOf(book.id) !== -1) {
        book.shelf = myBooksShelves[myBooksIDs.indexOf(book.id)];
      } else {
        book.shelf = "none";
      }
      return book;
    });
    if (this.state.books.length > 0) {
      const keptBooks = updatedBooks.map(book => {
        //In case both the authors and image URL is available.
        if (book.authors && book.imageLinks) {
          return (
            <li key={book.id}>
              <Book
                author={book.authors[0]}
                title={book.title}
                link={`url(${book.imageLinks.thumbnail})`}
                onBookShelfUpdate={this.props.onBookShelfUpdate}
                status={book.shelf}
                id={book.id}
              />
            </li>
          );
          //In case the authors are unknown
        } else if (book.imageLinks && !book.authors) {
          return (
            <li key={book.id}>
              <Book
                author={"N/A"}
                title={book.title}
                link={`url(${book.imageLinks.thumbnail})`}
                onBookShelfUpdate={this.props.onBookShelfUpdate}
                status={book.shelf}
                id={book.id}
              />
            </li>
          );
          //In case the image link is broken. 
        } else {
          return (
            <li key={book.id}>
              <Book
                author={"N/A"}
                title={book.title}
                link={`url({book.imageLinks.thumbnail})`}
                onBookShelfUpdate={this.props.onBookShelfUpdate}
                status={book.shelf}
                id={book.id}
              />
            </li>
          );
        }
      });
      return keptBooks;
    }
  }
  onInputChange = async e => {
    const query = e.target.value;
    this.setState({ term: query });
    if (query.length > 0) {
      const response = await search(query.trim());
      if (response.length > 0) {
        this.setState({ books: response });
      } else {
        this.setState({ books: [] });
      }
    } else {
      this.setState({ books: [] });
    }
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            href="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.term}
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.showBooks()}</ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
