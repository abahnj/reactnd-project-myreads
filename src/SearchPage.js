import { Component } from 'react'
import * as _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Book from './Book'

export default class SearchPage extends Component {
  state = {
    query: '',
    booksFound: [],
    err: false
  }

  searchForBooks = _.debounce(query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({booksFound: []})
        } else {
          this.setState({booksFound: books})
        }
      })
    } else {
      this.setState({searchBooks: []})
    }
  }, 400)

  resetSearch = () => {
    this.setState({searchBooks: []})
  }

  handleChange = event => {
    const val = event.target.value
    this.setState({query: val}, () => {

      this.searchForBooks(val)
    })
  }

  render () {
    const {query, booksFound, err} = this.state
    const {books, switchShelf} = this.props

    const updatedBooks = booksFound.map(book => {
      books.map(b => {
        if (b.id === book.id) {
          book.shelf = b.shelf
        }
        return b
      })
      return book
    })

    return (
      <Route render={({history}) =>
        (<div className="search-books">
            <div className="search-books-bar">
              <button className="close-search"
                      onClick={history.goBack}>Close
              </button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                       value={query}
                       onChange={this.handleChange}/>

              </div>
            </div>
            <div className="search-books-results">
              {booksFound.length > 0 && (
                <div>
                  <h3>Found {booksFound.length} books </h3>
                  <ol className="books-grid">
                    {updatedBooks.map(book => (
                      <Book
                        book={book}
                        key={book.id}
                        shelf={book.shelf ? book.shelf : 'none'}
                        switchShelf={switchShelf}
                      />
                    ))}
                  </ol>
                </div>
              )}
              {err && (
                <h3>Did not find any books!</h3>
              )}
            </div>
          </div>
        )}/>
    )
  }
}