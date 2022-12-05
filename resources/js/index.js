const baseUrl = "https://my-mock-json-api-jkc5omn42a-as.a.run.app/"

const list = document.getElementById('list')
const addButton = document.getElementById('addButton')

list.onclick = function (event) {
    let target = getEventTarget(event)
    console.log(target.innerHTML)
    toDetailPage(target.parentNode.id)
}

addButton.onclick = function() {
    console.log('add clicked')
    window.location.href = "add.html"
}

fetchBooks()

function getEventTarget(e) {
    e = e || window.event
    return e.target || e.srcElement
}

function toDetailPage(id) {
    let queryString = "?id=" + id
    console.log(queryString)
    window.location.href = "detail.html" + queryString
}

function fetchBooks() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch(baseUrl + "/books", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setupList(result)
        })
        .catch(error => {
            console.log('error', error)
        })
}

function setupList(books) {
    for (let i = 0; i <= books.length; i++) {
        let book = books[i]
        if (book != null) {
            let li = document.createElement("li")
            
            let pId = document.createElement("p")
            let pTitle = document.createElement("p")
            let pAuthor = document.createElement("p")
            let pPages = document.createElement("p")

            let documentFragment = document.createDocumentFragment();

            pId.innerHTML = "Id: " + book.id
            pTitle.innerHTML = "Title: " + book.title
            pAuthor.innerHTML = "Author: " + book.author
            pPages.innerHTML = "Pages: " + book.pages

            documentFragment.appendChild(pId)
            documentFragment.appendChild(pTitle)
            documentFragment.appendChild(pAuthor)
            documentFragment.appendChild(pPages)

            li.appendChild(documentFragment)
            li.setAttribute("id", book.id)
            list.appendChild(li)
        }
    }
}
