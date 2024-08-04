let container = document.getElementById("container");
let addBook = document.getElementById("add-btn");
let addNewBook = document.getElementById("add-book");
let formContainer = document.getElementById("form-container");
let numBooks = document.getElementById("num-books");

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
    if (book instanceof Book) {
      if (
        !this.books.some((existingBook) => existingBook.title === book.title)
      ) {
        this.books.push(book);
      } else {
        alert("Book already exists in the library!");
      }
    } else {
      throw new Error("Invalid book instance");
    }
  }

  removeBook(book) {
    this.books = this.books.filter((b) => b !== book);
  }

  getBookFromLibrary(index) {
    return this.books[index];
  }

  getBookByTitle(title) {
    return this.books.find((book) => book.title === title);
  }

  showBooks() {
    container.innerHTML = "";
    this.books.forEach((book, index) => {
      let newBook = document.createElement("div");
      let newTitle = document.createElement("span");
      let newAuthor = document.createElement("span");
      let newPages = document.createElement("span");
      let newReadButton = document.createElement("button");
      let newDeleteButton = document.createElement("button");
      newBook.id = "book";
      newReadButton.id = "read-button";
      newDeleteButton.id = "delete";

      newTitle.innerText = book.title;
      newTitle.id = "title";
      newAuthor.innerText = book.author;
      newAuthor.id = "author";
      newPages.innerText = `Number of pages: ${book.pages}`;
      newPages.id = "pages";
      newReadButton.innerText = book.read ? "Read" : "Unread";
      newReadButton.className = book.read ? "read" : "unread";
      newDeleteButton.innerText = "Delete";

      newBook.appendChild(newTitle);
      newBook.appendChild(newAuthor);
      newBook.appendChild(newPages);
      newBook.appendChild(newReadButton);
      newBook.appendChild(newDeleteButton);
      container.appendChild(newBook);
      updateDisplay.readButtons(newReadButton);
      updateDisplay.deleteButton(newDeleteButton);
    });
    this.updateNumBooks();
  }

  updateNumBooks() {
    numBooks.innerText = `0${this.books.length}`;
  }
}

const updateDisplay = (() => {
  const library = new Library();

  addBook.addEventListener("click", () => {
    formContainer.style.display =
      formContainer.style.display === "none" ? "flex" : "none";
  });

  addNewBook.addEventListener("click", () => {
    let title = document.getElementById("title-input").value;
    let author = document.getElementById("author-input").value;
    let pages = Number(document.getElementById("page-input").value);
    let read = document.getElementById("read-input").checked;

    if (title === "" || author === "" || pages <= 0) {
      alert("Please enter valid book details!");
      return;
    }

    let newBook = new Book(title, author, pages, read);
    library.addBook(newBook);
    library.showBooks();
    formContainer.style.display = "none";
    document.getElementById("title-input").value = "";
    document.getElementById("author-input").value = "";
    document.getElementById("page-input").value = "";
    document.getElementById("read-input").checked = false;
  });

  const readButtons = (button) => {
    button.addEventListener("click", function () {
      let currentBook = library.getBookByTitle(
        button.parentNode.firstChild.innerText
      );
      currentBook.read = !currentBook.read;
      library.showBooks();
    });
  };

  const deleteButton = (button) => {
    button.addEventListener("click", function () {
      let isConfirmed = confirm(
        `Are you sure you want to delete the book - "${this.parentNode.firstChild.innerText}"`
      );
      if (isConfirmed) {
        library.removeBook(
          library.getBookByTitle(this.parentNode.firstChild.innerText)
        );
        library.showBooks();
      }
    });
  };

  const saveToStorage = () => {
    if (storageAvailable("localStorage")) {
      localStorage.clear();
      localStorage.setItem("books", JSON.stringify(library.getBooks()));
    } else if (storageAvailable("sessionStorage")) {
      sessionStorage.clear();
      sessionStorage.setItem("books", JSON.stringify(library.getBooks()));
    } else {
      console.log("No storage available");
    }
  };

  window.addEventListener("beforeunload", saveToStorage);

  return { readButtons, deleteButton, library };
})();

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

if (storageAvailable("localStorage")) {
  if (localStorage.getItem("books") !== null) {
    const books = JSON.parse(localStorage.getItem("books"));
    const library = updateDisplay.library;
    books.forEach((book) => {
      let newBook = new Book(book.title, book.author, book.pages, book.read);
      library.addBook(newBook);
    });
    library.showBooks();
    document.getElementById("form-container").style.display = "none";
  }
} else if (storageAvailable("sessionStorage")) {
  if (sessionStorage.getItem("books") !== null) {
    const books = JSON.parse(sessionStorage.getItem("books"));
    const library = updateDisplay.library;
    books.forEach((book) => {
      let newBook = new Book(book.title, book.author, book.pages, book.read);
      library.addBook(newBook);
    });
    library.showBooks();
    document.getElementById("form-container").style.display = "none";
  }
} else {
  alert("No storage available! Your data will not be saved.");
}
