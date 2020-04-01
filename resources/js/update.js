const baseUrl = "https://ancient-brook-04057.herokuapp.com"

const id = document.getElementById("id")
const title = document.getElementById("title")
const author = document.getElementById("author")
const pages = document.getElementById("pages")

const updateButton = document.getElementById("updateButton")
const cancelButton = document.getElementById("cancelButton")

updateButton.onclick = function () {
    updateBook()
}

cancelButton.onclick = function () {
    callDialogCancel()
}

receiveParams()

function receiveParams() {
    let queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);

    let queries = queryString.split("&");

    let paramsID = queries[0].split("=")
    let keyID = paramsID[0]
    let valueID = paramsID[1]

    let paramsTitle = queries[1].split("=")
    let keyTitle = paramsTitle[0]
    let valueTitle = paramsTitle[1]

    let paramsAuthor = queries[2].split("=")
    let keyAuthor = paramsAuthor[0]
    let valueAuthor = paramsAuthor[1]

    let paramsPages = queries[3].split("=")
    let keyPages = paramsPages[0]
    let valuePages = paramsPages[1]

    setupBookDetail(valueID, valueTitle, valueAuthor, valuePages)
}

function setupBookDetail(textId, textTitle, textAuthor, textPages) {
    id.innerHTML = textId
    title.value = textTitle
    author.value = textAuthor
    pages.value = textPages
}

function updateBook() {
    let textId = id.innerHTML
    let textTitle = title.value
    let textAuthor = author.value
    let textPages = pages.value

    console.log(textId)
    console.log(textTitle)
    console.log(textAuthor)
    console.log(textPages)

    if (textId != "", textTitle != "" && textAuthor != "" && textPages != "") {
        callApiUpdateBook(textId, textTitle, textAuthor, textPages)
    } else {
        alert("Check Data")
    }
}

function callApiUpdateBook(id, title, author, pages) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": title,
        "author": author,
        "pages": pages
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl + "/books/" + id, requestOptions)
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
