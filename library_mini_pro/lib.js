let resultArray;
let divContainer = document.querySelector('.bottom-container');
let input = document.querySelector('input');
let cross = document.querySelector('.cross');

let searchResultsContainer = document.querySelector('.bottom-container');
let searchInput = document.querySelector('#searchInput');
let clearButton = document.querySelector('.cross');

async function fetchData(title) {
    try {
        const url = (title) ? `https://apis.ccbp.in/book-store?title=${title}` : 'https://apis.ccbp.in/book-store?title=best';
        let response = await fetch(url);
        let data = await response.json();

        resultArray = data.search_results;
    } catch (err) {
        console.error('Error fetching data:', err.message);
        resultArray = [];
    }
}


function createBookElement(book) {
    let img = document.createElement('img');
    let pElem = document.createElement('p');
    let divBook = document.createElement('div');

    img.setAttribute('src', book.imageLink);
    pElem.innerText = book.author;

    divBook.appendChild(img);
    divBook.appendChild(pElem);
    return divBook;
}


function displaySearchResults(title) {
    fetchData(title).then(() => {
        searchResultsContainer.innerHTML = ''; 

        if (resultArray.length >= 1) {
            for (let book of resultArray) {
               
                searchResultsContainer.appendChild(createBookElement(book));
            }
        } else {
            let noResultsElem = document.createElement('h1');
            noResultsElem.classList.add('no-results');
            noResultsElem.innerText = "No results found";
            searchResultsContainer.appendChild(noResultsElem);
        }
    });
}


searchInput.addEventListener('keydown', (event) => {
    if (event.which === 13) {
        const userInput = searchInput.value.trim();
        if (userInput !== '') {
            displaySearchResults(userInput);
        }
    }
});

if(input.value === ''){
    displaySearchResults();
}


clearButton.addEventListener('click', () => {
    searchInput.value = '';
    displaySearchResults();
});
