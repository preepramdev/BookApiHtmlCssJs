const baseUrl = "https://ancient-brook-04057.herokuapp.com"

const title = document.getElementById("title")
const author = document.getElementById("author")
const pages = document.getElementById("pages")

const addButton = document.getElementById("addButton")
const cancelButton = document.getElementById("cancelButton")

addButton.onclick = function () {
    addBook()
}

cancelButton.onclick = function () {
    callDialogCancel()
}

function addBook() {
    let textTitle = title.value
    let textAuthor = author.value
    let textPages = pages.value

    console.log(textTitle)
    console.log(textAuthor)
    console.log(textPages)

    if (textTitle != "" && textAuthor != "" && textPages != "") {
        callApiAddBook(textTitle, textAuthor, textPages)
    } else {
        alert("Check Data")
    }
}

function callApiAddBook(title, author, pages) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": title,
        "author": author,
        "pages": pages
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl + "/books", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            callDialogDone()
        })
        .catch(error => {
            console.log('error', error)
        });
}

function callDialogCancel() {
    let dialogCancel = confirm('Are you sure you want to leave this?')
    if (dialogCancel) {
        console.log("confirm dialogCancel")
        window.location.href = "index.html"
    } else {
        console.log("cancel dialogCancel")
    }
}

function callDialogDone() {
    alert("Done")
    window.location.href = "index.html"
}

// function onBackPress() {
//     callDialogCancel()
// }
