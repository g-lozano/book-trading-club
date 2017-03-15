import React from 'react';
import Book from './book.jsx';

class AllBooks extends React.Component {
  render() {
    var allbooks = []
    if (typeof this.props.allbooks == 'object') {
      if (this.props.allbooks.length)
        this.props.allbooks.forEach(
          (book) => {
            allbooks.push(<div><Book book={book}/></div>)
          })
      else
        allbooks.push(<div></div>)
    }
    return (
      <div>
        <div className="text-center view-title">All Books</div>
        {allbooks}
      </div>
    )
  }
}

export default AllBooks
