const myLibrary = []
const container = document.querySelector('.container');
const bookTable = document.querySelector('.bookTable'); 
const addButton = document.querySelector('.addButton');
const addModal = document.querySelector('.addModal');
const closeButton = document.querySelector('.closeButton');
const submitButton = document.querySelector('.submitButton');
const questionModal = document.querySelector('.questionModal');
const yesButton = document.querySelector('.yesButton');
const noButton = document.querySelector('.noButton');
const deleteAllButton = document.querySelector('.deleteAllButton');

let actionToPerform = null;

function Book(name, author, pages, status) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;

    Book.prototype.toggleStatus = function() {
        this.status = (this.status === "read already") ? "not read yet" : "read already";
    }
}

function addBookToLibrary(name, author, pages, status) {
    const book = new Book(name, author, pages, status);
    myLibrary.push(book);
    console.log("Новая книга добавлена с ID:", book.id);
}

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);

    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

function showBooks() {
    bookTable.innerHTML = "";
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
        const changeCell = document.createElement("td");
        const changeButton = document.createElement("button");
        changeButton.className ='changeButton';
        changeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" /></svg>`;
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.className ='deleteButton';
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;
        
        changeCell.appendChild(changeButton);
        deleteCell.appendChild(deleteButton);

        changeButton.addEventListener('click', () => {
            book.toggleStatus();
            showBooks();
        })

        deleteButton.addEventListener('click', () => {
            actionToPerform = () => {
                deleteBook(book.id);  
                showBooks();
            }
            questionModal.showModal(); 
        })

        newRow.appendChild(numCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(authorCell);
        newRow.appendChild(pagesCell);
        newRow.appendChild(statusCell);
        newRow.appendChild(changeCell);
        newRow.appendChild(deleteCell);
        
        bookTable.appendChild(newRow);
    });
}

addButton.addEventListener('click', () => {
    addModal.showModal();
})

closeButton.addEventListener('click', () => {
    addModal.close();
})

deleteAllButton.addEventListener('click', () => {
    actionToPerform = () => {
        myLibrary.length = 0;
        showBooks();
    }

    questionModal.showModal();
})

submitButton.addEventListener('click', () => {
    let name = document.getElementById('nameInput');
    let author = document.getElementById('authorInput');
    let pages = document.getElementById('pagesInput');
    let status = document.getElementById('statusCheckbox');
    let statusText = status.checked ? "read already" : "not read yet";
    
    if (name.value === "" || author.value === "" || pages.value === "") {
        alert("Please fill in the fields");
        return;
    }

    addBookToLibrary(name.value, author.value, pages.value, statusText);
    showBooks();

    addModal.close();
    name.value = "";
    author.value = "";
    pages.value = "";
    status.checked = false;
})

yesButton.addEventListener('click', () => {
    if (actionToPerform) {
        actionToPerform();
        actionToPerform = null;
    }

    questionModal.close();
})

noButton.addEventListener('click', () => {
    actionToPerform = null;
    questionModal.close();
})

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'read already');

showBooks();
