// const yargs = require('yargs');
// const {hideBin} = require('yargs/helpers');

const { program } = require("commander");

const Books = require("./books");

const invokeAction = async ({ action, title, body, id }) => {
  switch (action) {
    case "getAll":
      const books = await Books.getBooks();
      return books; // або console.log(books); break
    case "getById":
      const book = await Books.getBook(id);
      return book;
    case "add":
      const newBook = await Books.addBook({ title, body });
      return newBook;
    case "delete":
      const deleteBooks = await Books.deleteBook(id);
      return deleteBooks;
    case "update":
      const updateBook = await Books.updateBook(id, { title, body });
      return updateBook;
    default:
      return "Uknown action";
  }
};

// program.option('--action, [type]').option('--id, [type]').option('--title, [type]').option('--body, [type]');
program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Book id")
  .option("-t, --title <title>", "Book title")
  .option("-b, --body <body>", "Book body");

program.parse(process.argv);

invokeAction(program.opts()).then(console.log).catch(console.error);

// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);
// invokeAction(argv);

// invokeAction({action: 'read'});
// invokeAction({action: 'getbyId', id: 4})
// invokeAction({action: 'delete', id: 4})
// invokeAction({action: 'add', title: 'Hello', body: "World"});
