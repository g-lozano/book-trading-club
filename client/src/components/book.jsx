import React from 'react'

export default ({book}) => (
    <div className="book">
      <img src={book.img} title={book.title}/>
    </div>
)