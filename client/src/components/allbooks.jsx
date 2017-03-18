import React from 'react';
import Book from './book.jsx';

class AllBooks extends React.Component {
  render() {
    var allbooks = []
    if (typeof this.props.allbooks == 'object') {
      if (this.props.allbooks.length)
        this.props.allbooks.forEach(
          (book) => {
            var button = (
              <button className="book-button trade-button" onClick={this.props.handleClickTrade}>
                <i className="material-icons">swap_vertical_circle</i>
              </button>
            )
            allbooks.push(
              <div className="relative book-div">
                <Book button={button} book={book}/>
              </div>
            )
          })
      else
        allbooks.push(<div></div>)
    }
    return (
      <div>
        <div className="text-center view-title">All Books</div>
        <div className="float-left">
          {allbooks}
        </div>
      </div>
    )
  }
}

export default AllBooks
