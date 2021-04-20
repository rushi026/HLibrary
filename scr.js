/*
	Title: 	            HLibrary 
	Description:        This is the web base mini Library System. We can add book to it. Show the list of all the added books. And we can also search particular book from the list using Title of book or Author name in search box.
	Date:		        21/04/2021
	Last Updated:       22/04/2021
    Author:             Rushiraj Parekh
*/


console.log("Let the game begin");


class Book{
    constructor(title, author, type){
        this.title = title;
        this.author = author;
        this.type = type;
    }
}

function showTable(){
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    let str = localStorage.getItem('books');
    if(str == null){
        html = `<h3>Library is empty. You do not have any books now.<h3>`;
        tbody.innerHTML = html;
        return;
    }
    let arrayOfBooks = JSON.parse(str);
    let i = 0;
    arrayOfBooks.forEach((book) => {
        let bookObj = JSON.parse(book);
        let title = bookObj.title;
        let author = bookObj.author;
        let type = bookObj.type;

        let html = `
                <tr class="bookRow">
                    <th scope="row">${++i}</th>
                    <td>${title}</td>
                    <td>${author}</td>
                    <td>${type}</td>
                </tr>
        `;
        tbody.innerHTML += html;
    });
}

showTable();

class Display{
    // add method
    add(book){
        let str = localStorage.getItem('books');
        console.log(str);
        let arrayOfBooks;
        if(str == null){
            arrayOfBooks = [];
        }else{
            arrayOfBooks = JSON.parse(str);
        }
        arrayOfBooks.push(JSON.stringify(book));
        localStorage.setItem('books', JSON.stringify(arrayOfBooks));
        showTable();
    }

    // clear method
    clear(){
        let form = document.getElementById('HLibraryForm');
        form.reset();
    }

    // validate method
    validate(book){
        let t1 = true, t2 = true, t3 = true; 
        if(book.title == "")
            t1 = false;
        if(book.author == "")
            t2 = false;
        if(book.type == undefined)
            t3 = false;
    
        if(t1 && t2 && t3)
            return true;
        else
            return false;
    }

    // show method
    show(color){
        let container = document.getElementsByClassName('container')[0];
        let html;
        if(color == 'success'){
            html = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Congratulations!</strong> Your book has been added successfully!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        }else if(color == 'danger'){
            html = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Faile!</strong> Enter valid details!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        }
        let elem = document.getElementById('elem');
        elem.innerHTML = html;    
        setTimeout(() => {
            elem.innerHTML = '';
        }, 3000);
    }
}


// Add submit event listner
let form = document.getElementById('HLibraryForm');
form.addEventListener('submit', formSubmit);

function formSubmit(e){
    e.preventDefault();
    // console.log('You have submited HLibrary form');

    let name = document.getElementById('bookname').value;
    let author = document.getElementById('bookauthor').value;
    
    let programming = document.getElementById('programming');
    let fiction = document.getElementById('fiction');
    let novel = document.getElementById('novel');
    let other = document.getElementById('other');

    let type;

    if(fiction.checked){
        type = fiction.value;
    }else if(programming.checked){
        type = programming.value;
    }else if(novel.checked){
        type = novel.value;
    }else if(other.checked){
        type = other.value;
    }

    let book = new Book(name, author, type);
    // console.log(book);

    let display = new Display();
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success');
    }else{
        display.show('danger');
    }
}

let search = document.getElementById('search');
search.addEventListener('input', (e) => {
    text = search.value;
    let bookRow = document.getElementsByClassName('bookRow');
    Array.from(bookRow).forEach((e) => {
        if(e.innerText.includes(text)){
            e.style = "display: table-row";
        }
        else{
            e.style = "display: none";
        }
    });
}); 