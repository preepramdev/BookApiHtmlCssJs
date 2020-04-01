const baseUrl = "https://ancient-brook-04057.herokuapp.com"

const id = document.getElementById("id")
const title = document.getElementById("title")
const author = document.getElementById("author")
const pages = document.getElementById("pages")

const updateButton = document.getElementById("updateButton")
const removeButton = document.getElementById("removeButton")

updateButton.onclick = function () {
    toUpdatePage()
}

removeButton.onclick = function () {
    callDialogConfirmcallApiRemoveBook()
}

receiveParams()

function receiveParams() {
    let queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);

    let queries = queryString.split("&");

    for (let i = 0; i < queries.length; i++) {
        let params = queries[i].split("=")
        let key = params[0]
        let value = params[1]
        if (key = "id") {
            fetchDetail(value)
        }
    }
}

function fetchDetail(bookId) {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(baseUrl + "/books/" + bookId, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                console.log(data)
                let book = data
                setupBookDetail(book);
            }
        })
        .catch(error => {
            console.error(error)
        });
}

function setupBookDetail(book) {
    id.innerHTML = book.id;
    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;
}

function toUpdatePage() {
    let textId = id.innerHTML
    let textTitle = title.innerHTML
    let textAuthor = author.innerHTML
    let textPages = pages.innerHTML

    console.log(textId)
    console.log(textTitle)
    console.log(textAuthor)
    console.log(textPages)

    let queryString = "?id=" + textId
    queryString = queryString + "&title=" + textTitle
    queryString = queryString + "&author=" + textAuthor
    queryString = queryString + "&pages=" + textPages
    console.log(queryString)
    window.location.href = "update.html" + queryString
}

function callApiRemoveBook(bookId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(baseUrl + "/books/" + bookId, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            callDialogRemoveDone()
        })
        .catch(error => {
            console.log('error', error)
        });
}

function callDialogConfirmcallApiRemoveBook() {
    let dialogRemove = confirm('Are you sure you want to Remove this book?')
    if (dialogRemove) {
        console.log("confirm dialogRemove")
        let bookId = id.innerHTML
        callApiRemoveBook(bookId)
    } else {
        console.log("cancel dialogRemove")
    }
}

function callDialogRemoveDone() {
    alert("Removed")
    window.location.href = "index.html"
}