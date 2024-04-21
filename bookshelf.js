// const yargs = require('yargs');
// const {hideBin} = require('yargs/helpers');

const Books = require('./books');

const {program} = require('commander');

const invokeAction = async ({action, title, body, id}) => {
    switch (action) {
        case 'read':
            const allBooks = await Books.getBooks();
            console.log(allBooks);
            break;
        case 'getbyId':
            const book = await Books.getBook(id);
            console.log(book);
            break;
        case 'add':
            const newBook = await Books.addBook({title, body});
            console.log(newBook);
            break;
        case 'delete':
            const deleteBooks = await Books.deleteBook(id);
            console.log(deleteBooks);
            break;
        case 'update':
            const updateBook = await Books.updateBook(id, {title, body});
            console.log(updateBook);;
            break;
        default:
            console.log('Uknown action');
            break;
    }
}

program.option('--action, [type]').option('--id, [type]').option('--title, [type]').option('--body, [type]');
program.parse();
const options = program.opts();



invokeAction(options);

// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);
// invokeAction(argv);

// invokeAction({action: 'read'});
// invokeAction({action: 'getbyId', id: 4})
// invokeAction({action: 'delete', id: 4})
// invokeAction({action: 'add', title: 'Hello', body: "World"});