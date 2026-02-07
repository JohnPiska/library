const myLibrary = []

function Book(name, author, pages, status) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(name, author, pages, status) {
    const book = new Book(name, author, pages, status);
    myLibrary.push(book);
}

const container = document.querySelector('.container');
const bookTable = document.querySelector('.bookTable'); 

function showBooks() {
    myLibrary.forEach((book, index) => {
        const newRow = document.createElement("tr");

        const numCell = document.createElement("td");
        numCell.textContent = index + 1;
        const nameCell = document.createElement("td");
        nameCell.textContent = book.name;
        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;
        const statusCell = document.createElement("td");
        statusCell.textContent = book.status;

        newRow.appendChild(numCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(authorCell);
        newRow.appendChild(pagesCell);
        newRow.appendChild(statusCell);
        
        bookTable.appendChild(newRow);
    });
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295 pages', '-');
addBookToLibrary('The Hob', 'J.R.R. Tolkien', '295 pages', '-');
addBookToLibrary('The Ho', 'J.R.R. Tolkien', '295 pages', '-');
addBookToLibrary('The H', 'J.R.R. Tolkien', '295 pages', '-');
addBookToLibrary('The Hobbi', 'J.R.R. Tolkien', '295 pages', '-');
showBooks();