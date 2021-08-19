import React from "react";
import Book from "./Book";

const Shelf = ({name, books, type, onBookShelfUpdate}) => {
    const filteredBooks = books.filter((book) => book.shelf === type)
    const keptBooks = filteredBooks.map((book) => {
        return (
            <li key={book.id}>
            <Book author={book.authors[0]} 
            title={book.title} 
            link={`url(${book.imageLinks.thumbnail})`}
            onBookShelfUpdate={onBookShelfUpdate}
            status={book.shelf}
            id={book.id}
            />
            </li>
        );
    })
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
        {keptBooks}
        </ol>
        </div>
        </div>
    );
    }


export default Shelf;

