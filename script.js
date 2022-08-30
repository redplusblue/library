let library = [];
let container = document.getElementById('container');
let addBook = document.getElementById('add-btn')
let addNewBook = document.getElementById('add-book')
let formContainer = document.getElementById('form-container');

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

class book {
    title = "";
    author = "";
    pages = 0;
    read = false;
}

function addBookToLibrary(book) {
    library.push(book);
}

function getBookFromLibrary(index) {
    return library[index];
}

function showBooks() {
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
    })
}

function addBooks(title, author, pages, read) {
    if(title.length != 0 && author.length != 0 && typeof(pages) == 'number' && typeof(read) == 'boolean') {
        let newBook = new book();
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

function refreshNodeLists() {
    let readButton = document.querySelectorAll("#read-button");
    readButton.forEach(function (button) {
        button.addEventListener("click", function () {
            if(button.innerText === 'Read') {
                button.innerText = 'Unread';
                button.className = 'unread';
                // Code to make changes in the database as well
            } else {
                button.innerText = 'Read';
                button.className = 'read';
            }
        }); 
    });

    let deleteButton = document.querySelectorAll('#delete');
    deleteButton.forEach((button) => {
        button.addEventListener('click', function() {
            isConfirmed = confirm(`Are you sure you want to delete the book - "${this.parentNode.firstChild.innerText}"`)
            if(isConfirmed){
            container.removeChild(this.parentNode)}
        })
    })
}