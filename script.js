let library = [];
let container = document.getElementById('container');

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
       newBook = document.createElement('div');
       newBook.id = 'book';
       newTitle = document.createElement('span'); 
       newAuthor = document.createElement('span');
       newPages = document.createElement('span');
       newReadButton = document.createElement('button');
       newReadButton.id = 'read-button';
       newDeleteButton = document.createElement('button');
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
    })
}

harryPotter = new book();
harryPotter.title = "Harry Potter and something that happened";
harryPotter.author = "J.K. Rowling";
harryPotter.pages = 400;
harryPotter.read = true;
addBookToLibrary(harryPotter);
showBooks()

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