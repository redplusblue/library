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

    getBooks() {
        return this.books;
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
            storage.saveToStorage(library.getBooks());
        } else {
            alert("Invalid input!")
        }
    }
    
    const readButtons = (button) => {
            button.addEventListener("click", function () {
                console.log(library)
                console.log(button.parentNode.firstChild.innerText)
                let currentBook = library.getBookByTitle(button.parentNode.firstChild.innerText);
                if(button.innerText === 'Read') {
                    button.innerText = 'Unread';
                    button.className = 'unread';
                    currentBook.read = false;
                } else {
                    button.innerText = 'Read';
                    button.className = 'read';
                    currentBook.read = true;
                }
                // TBD
                // storage.saveToStorage(library.getBooks());
            }); 
        };
    
    const deleteButton = (button) => {
        button.addEventListener('click', function() {
            isConfirmed = confirm(`Are you sure you want to delete the book - "${this.parentNode.firstChild.innerText}"`)
            if(isConfirmed){
                library.removeBook(library.getBookByTitle(this.parentNode));
                container.removeChild(this.parentNode)
                library.updateNumBooks();
                storage.saveToStorage(library.getBooks());
            }
        })
    }
    
    return { readButtons, deleteButton, addBooks };
})();

// Storage, source: MDN

const storage = ((currentLibrary) => {
    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    function saveToStorage(currentLibrary) {
        if (storageAvailable('localStorage')) {
            localStorage.clear();
            localStorage.setItem('books', JSON.stringify(currentLibrary));
        } else if (storageAvailable('sessionStorage')) {
            sessionStorage.clear();
            sessionStorage.setItem('books', JSON.stringify(currentLibrary));
        } else {
            console.log('No storage available');
        }
    }

    const checkIfSaved = (storage) => {
        if (storage.getItem('books') != null) {
            return true;
        } else {
            return false;
        }
    }

    if (storageAvailable('localStorage')) {
        if (checkIfSaved(localStorage)) {
            const books = JSON.parse(localStorage.getItem('books'));
            const library = new Library();
            books.forEach((book) => {
                library.addBook(book); 
            });
            library.showBooks();
            document.getElementById('form-container').style.display = 'none';
            library.updateNumBooks();
        } else {
            console.log('localStorage: No saved data found!');
        }
    }
    else {
        if (storageAvailable('sessionStorage')) {
            checkIfSaved(sessionStorage);
            if (checkIfSaved(sessionStorage)) {
                const books = JSON.parse(localStorage.getItem('books'));
                const library = new Library();
                books.forEach((book) => {
                    library.addBook(book); 
                });
                library.showBooks();
                document.getElementById('form-container').style.display = 'none';
                library.updateNumBooks();
            } else {
                console.loglog('sessionStorage: No saved data found!');
            }
        }
        else {
            alert('No storage available! Your data will not be saved.');
        }
    }
    return { saveToStorage };
})();


