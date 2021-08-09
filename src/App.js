import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import BookList from './BookList'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {books: []}

  componentDidMount () {
    // get books on start
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  moveBook = async (book, shelf) => {
    const updatedBook = await BooksAPI.update(book, shelf)

    if (shelf === 'none') {
      this.setState(prevState => ({
        myBooks: prevState.books.filter(b => b.id !== book.id)
      }))
    } else {
      book.shelf = shelf
      this.setState(prevState => ({
        myBooks: prevState.books.filter(b => b.id !== book.id).concat(book)
      }))
    }
  }

  render () {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            <BookList books={this.state.books} switchShelf={this.moveBook}/>
          </Route>
          <Route path="/search">
            <SearchPage
              books={this.state.books}
              switchShelf={this.moveBook}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
