import { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  render () {
    const {books, switchShelf, shelf} = this.props

    return (
      <ol className="books-grid">
        {books.map(book => (
          <Book
            book={book}
            key={book.id}
            shelf={shelf}
            switchShelf={switchShelf}
          />
        ))}
      </ol>
    )
  }
}

export default Shelf