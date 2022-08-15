let formInput = document.querySelectorAll(".form-input");
let formBookSubmit = document.getElementById("new-book-form");
let cardContainer = document.querySelector(".card-container");
let totalBooks = document.querySelector(".total-books");

let myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
this.bookId = myLibrary.length + pages;
this.title = title;
this.author = author;
this.pages = pages;
this.hasBeenRead = hasBeenRead;

}
function addBookToLibrary(e) {
  e.preventDefault();

  let bookTitle = e.target[0].value;
  let bookAuthor = e.target[0].value;
  let bookPages = e.target[0].value;
  let hasBeenRead = e.target[0].value;

  let insertBook = new Book(bookTitle, bookAuthor, bookPages, hasBeenRead);
  myLibrary.push(insertBook);
  
  modal.style.display = "none";

 formInput.forEach(function (index, item) {
   item.value = '';
 })
 render()
}

function render() {
  cardContainer.innerHTML = '';

  myLibrary.forEach(function (currentValue, index) {
    cardContainer.innerHTML += cardElement(currentValue);

  })
  totalBooks.innerHTML = myLibrary.length
}

function cardElement(data) {
  return `
   <div class="card">
    <div clas="card-top">
    <div class="content">
    <div class="left-side">
     <p class="has-been-read" data-is-read="read${data.bookId}">${data.hasBeenRead}</p>

    </div>
    <div class="right-side">
     <p class="title"><b>${data.title}></b></p>
     <p>${data.author} - ${data.pages} pages</p>
    </div>
    </div>
    </div>
     <div class="card-bottom">
     <button class="read-button" data-read="read${data.bookId}">read</button>
     <button class="delete-button" data-book="book${data.bookId}">delete</button>

     </div>
   </div>

  `
}

function deleteFunc(e) {
  myLibrary = myLibrary.filter(function(data) {
    return data.bookId != e.target.dataset.book.replace("book", "");
  })
  render()
}
function readFunc(e) {
  let readText = document.querySelector(`[data-is-read="${e.target.dataset.read}"]`)

 let dataForChange = myLibrary.find(function(data) {
   return data.bookId = readText.getAttribute('data-is-read').replace('read', '');

 })
if(dataForChange['hasBeenRead'] == 'read') {
  dataForChange['hasBeenRead'] = 'unread'
  render()

} else {
  dataForChange['hasBeenRead'] = 'read'
  render()
}

}
render()

formBookSubmit.addEventListener("submit", addBookToLibrary);
document.addEventListener("click", function(e) {
  if(e.target.classList.contains('delete-button')) {
    deleteFunc(e)
  } else if (e.target.classList.contains('read-button')) {
    readFunc(e)
  }
})