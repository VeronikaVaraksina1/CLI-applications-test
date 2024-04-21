const fs = require("node:fs/promises"); // fs/promises
const crypto = require("node:crypto");

const path = require("node:path"); // path
const filePath = path.resolve("books", "books.json"); // const filePath = path.join(__dirname, 'books.json');

const readBooks = async () => {
  const books = await fs.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(books); // інакше console.log(books) поверне json
};

const writeBooks = (books) => {
  return fs.writeFile(filePath, JSON.stringify(books, null, 2));
};

const getBooks = async () => {
  const books = await readBooks();
  return books;
};

// ===================

const getBook = async (id) => {
  const books = await readBooks();
  const book = books.find((book) => book.id === id);
  return book || null; // або явна умова: if (book === 'undefined') null; return book
};

const addBook = async (data) => {
  const books = await readBooks();
  const newBook = { id: crypto.randomUUID(), ...data };
  books.push(newBook);
  await writeBooks(books);
  return newBook;
};

const deleteBook = async (id) => {
  const books = await readBooks();
  const index = books.findIndex((book) => book.id === id);
  
  if (index === -1) {
    return null;
  }

  const deletedBook = books[index];
  books.splice(index, 1);
  await writeBooks(books);
  return deletedBook;
};

const updateBook = async (id, data) => {
  const books = await readBooks();
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return null;
  }

  const updatedBook = { id, ...data };
  books[index] = updatedBook;
  await writeBooks(books);
  return updatedBook;
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
