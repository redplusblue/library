let library = [];
let container = document.getElementById('container');
let addBook = document.getElementById('add-btn')
let addNewBook = document.getElementById('add-book')
let formContainer = document.getElementById('form-container');
let numBooks = document.getElementById('num-books');

addBook.addEventListener('click', () => {
    if(formContainer.style.display == 'none') {
        formContainer.style.display = 'flex';
    } else {
        formContainer.style.display = 'none';
    }
})

addNewBook.addEventListener('click', () => {
    let title = document.getElementById('title-input').value;
    let author = document.getElementById('author-input').value;
    let pages = Number(document.getElementById('page-input').value);
    let read = document.getElementById('read-input').checked;
    addBooks(title, author, pages, read);
    formContainer.style.display = 'none';
})

class Book {
    constructor(title = "", author = "", pages = 0, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        this.books.splice(this.books.indexOf(book), 1);
    }

    getBookFromLibrary(title) {
        return this.books.find(book => book.title === title);
    }
}

//function to add a book to the library
function addBookToLibrary(book) {
    library.push(book);
}

//function to get a book from the library
function getBookFromLibrary(index) {
    return library[index];
}

//function to show the books in the library on the page
function showBooks() {
    container.innerHTML = "";
    library.forEach(function (book) {
       let newBook = document.createElement('div');
       let newTitle = document.createElement('span'); 
       let newAuthor = document.createElement('span');
       let newPages = document.createElement('span');
       let newReadButton = document.createElement('button');
       let newDeleteButton = document.createElement('button');
       newBook.id = 'book';
       newReadButton.id = 'read-button';
       newDeleteButton.id = 'delete';

       newTitle.innerText = book.title;
       newTitle.id = 'title';
       newAuthor.innerText = book.author;
       newAuthor.id = 'author';
       newPages.innerText = `Number of pages: ${book.pages}`;
       newPages.id = 'pages'
       if(book.read === true) {
            newReadButton.innerText = 'Read';
            newReadButton.className = 'read';
        } else {
            newReadButton.innerText = 'Unread';
            newReadButton.className = 'unread';
        }
       newDeleteButton.innerText = 'Delete';

       newBook.appendChild(newTitle);
       newBook.appendChild(newAuthor);
       newBook.appendChild(newPages);
       newBook.appendChild(newReadButton);
       newBook.appendChild(newDeleteButton);
       container.appendChild(newBook);
       refreshNodeLists();
       updateNumBooks();
    })
}

//function to add books to the page
function addBooks(title, author, pages, read) {
    if(title.length != 0 && author.length != 0 && typeof(pages) == 'number' && typeof(read) == 'boolean') {
        let newBook = new Book();
        newBook.title = title;
        newBook.author = author;
        newBook.pages = pages;
        newBook.read = read;
        addBookToLibrary(newBook)
        showBooks()
    } else {
        alert("Invalid input!")
    }
}

//So that newly created nodes can be accessed
function refreshNodeLists() {
    let readButton = document.querySelectorAll("#read-button");
    readButton.forEach(function (button) {
        button.addEventListener("click", function () {
            if(button.innerText === 'Read') {
                button.innerText = 'Unread';
                button.className = 'unread';
                let index = library.findIndex(function (book) {
                    return book.title === button.parentNode.firstChild.innerText;
                })
                library[index].read = false;
            } else {
                button.innerText = 'Read';
                button.className = 'read';
                let index = library.findIndex(function (book) {
                    return book.title === button.parentNode.firstChild.innerText;
                })
                library[index].read = true;
            }
        }); 
    });

    let deleteButton = document.querySelectorAll('#delete');
    deleteButton.forEach((button) => {
        button.addEventListener('click', function() {
            isConfirmed = confirm(`Are you sure you want to delete the book - "${this.parentNode.firstChild.innerText}"`)
            if(isConfirmed){
            let index = library.indexOf(this.parentNode);
            library.splice(index, 1);
            container.removeChild(this.parentNode)
            updateNumBooks();}
        })
    })
}

//function to update the number of books in the library
function updateNumBooks() {
    numBooks.innerText = `0${library.length}`;
}
