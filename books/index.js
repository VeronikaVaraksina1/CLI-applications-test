const fs = require('node:fs/promises'); // fs/promises

const path = require('node:path'); // path
const filePath = path.resolve('books', 'books.json'); // const filePath = path.join(__dirname, 'books.json');

const getBooks = async () => {
    try {
        const books = await fs.readFile(filePath, {encoding: 'utf-8'});
        return JSON.parse(books);
    } catch (error) {
        return error.message;   
    }
};

const getBook = async (id) => {
    const books = await getBooks();
    const result = books.find(book => book.id === id);
    return result || null;
}

const addBook = async (data) => {
    const books = await getBooks();
    const newBook = {id: new Date(), ...data};
    books.push(newBook);
    fs.writeFile(filePath, JSON.stringify(books, null, 2));
    return newBook;
}

const deleteBook = async (id) => {
    const books = await getBooks();
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = books.splice(index, 1);
    fs.writeFile(filePath, JSON.stringify(books, null, 2));
    return result;
}

const updateBook = async (id, data) => {
    const books = await getBooks();
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return null;
    }
    books[index] = {id, ...data}
    fs.writeFile(filePath, JSON.stringify(books, null, 2));
    return books[index];
}

module.exports = {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook,
}