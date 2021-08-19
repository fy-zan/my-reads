import React from "react";

class Book extends React.Component {
  state = { status: this.props.status };
  handleSelectChange = async e => {
    await this.setState({ status: e.target.value });
    this.props.onBookShelfUpdate(this);
  };
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: this.props.link
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.state.status}
              onChange={this.handleSelectChange}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    );
  }
}

export default Book;
