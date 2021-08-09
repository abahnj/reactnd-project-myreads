import noBackground from './icons/noBackground.png'
import ShelfSwitcher from './ShelfSwitcher'

const Book = props => {
  const {book, switchShelf, shelf} = props

  const backgroundImg =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : noBackground

  const bookTitle = book.title ? book.title : 'No title available'

  return (<li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{backgroundImage: `url('${backgroundImg}')`}}
        />
        <ShelfSwitcher book={book} shelf={shelf} switchShelf={switchShelf}/>
      </div>
      <div className="book-title">{bookTitle}</div>
      {
        book.authors &&
        book.authors.map((author, index) => (
          <div className="book-authors" key={index}>
            {author}
          </div>
        ))}
    </div>
  </li>)
}
export default Book