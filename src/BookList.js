import { Route } from 'react-router-dom'
import Shelf from './shelf'

const BookList = props => {
  const shelfTypes = [
    {type: 'currentlyReading', title: 'Currently Reading'},
    {type: 'wantToRead', title: 'Want to Read'},
    {type: 'read', title: 'Read'}
  ]

  const {books, switchShelf} = props

  return (
    <Route render={({history}) => (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelfTypes.map(shelf => {
            const booksOnShelf = books.filter(book => book.shelf === shelf.type)
            return (<div className="bookshelf" key={shelf.type}>
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <Shelf books={booksOnShelf} shelf={shelf.type} switchShelf={switchShelf}/>
              </div>
            </div>)
          })}
        </div>
        <div className="open-search">
          <button onClick={() => history.push('/search')}>Add a book</button>
        </div>
      </div>
    )}/>

  )

}

export default BookList

