let container = document.getElementById('container');
let addBook = document.getElementById('add-btn')
let addNewBook = document.getElementById('add-book')
let formContainer = document.getElementById('form-container');
let numBooks = document.getElementById('num-books');

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

    getBookFromLibrary(index) {
        return this.books[index];
    }

    getBookByTitle(title) {
        return this.books.find(book => book.title === title);
    }

    showBooks() {
        container.innerHTML = "";
        this.books.forEach(function (book) {
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
           updateDisplay.readButtons(newReadButton);
           updateDisplay.deleteButton(newDeleteButton);
        })
    }

    updateNumBooks() {
        numBooks.innerText = `0${this.books.length}`;
    }
}


const updateDisplay = (() => {

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

    const library = new Library();
    const addBooks = (title, author, pages, read) => {
        if(title.length != 0 && author.length != 0 && typeof(pages) == 'number' && typeof(read) == 'boolean') {
            let newBook = new Book();
            newBook.title = title;
            newBook.author = author;
            newBook.pages = pages;
            newBook.read = read;
            library.addBook(newBook);
            library.showBooks();
        } else {
            alert("Invalid input!")
        }
    }
    
    const readButtons = (button) => {
            button.addEventListener("click", function () {
                if(button.innerText === 'Read') {
                    button.innerText = 'Unread';
                    button.className = 'unread';
                    let currentBook = library.getBookByTitle(button.parentNode.firstChild.innerText);
                    currentBook.read = false;
                } else {
                    button.innerText = 'Read';
                    button.className = 'read';
                    let currentBook = library.getBookByTitle(button.parentNode.firstChild.innerText);
                    currentBook.read = true;
                }
            }); 
        };
    
    const deleteButton = (button) => {
        button.addEventListener('click', function() {
            isConfirmed = confirm(`Are you sure you want to delete the book - "${this.parentNode.firstChild.innerText}"`)
            if(isConfirmed){
                library.removeBook(library.getBookByTitle(this.parentNode));
                container.removeChild(this.parentNode)
                library.updateNumBooks();
            }
        })
    }
    
    return { readButtons, deleteButton, addBooks };
})();



