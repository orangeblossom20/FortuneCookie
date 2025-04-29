const url = "https://api.api-ninjas.com/v1/quotes";

const cookie = document.getElementById('cookie');
const quoteText = document.getElementById('quote');
let isOpen = false;

cookie.addEventListener('click', () => {
    if (!isOpen) {
        cookie.src = 'images/opencookie.png';
        fetchRemoteData(url);
        isOpen = true;
    } else {
        cookie.src = 'images/closedcookie.png';
        quoteText.innerHTML = '';
        isOpen = false;
    }
});

function fetchRemoteData(apiUrl) {
    fetch(apiUrl, {
        method: 'GET',
        headers: { 'X-Api-Key': 'xwr4hBRAY4rxRXbX/LIsmw==DUYO8xWSzQNLngsW' }
    })
    .then(response => response.json())
    .then(jsonData => buildPage(jsonData))
    .catch(error => {
        console.error('Fetch error:', error);
        quoteText.innerHTML = '<p>Sorry, we couldn’t retrieve a fortune right now.</p>';
    });
}

function buildPage(jsonData) {
    console.log(jsonData);

    const quoteObj = jsonData[0]; 

    const newHTML = `
        <h2>"${quoteObj.quote}"</h2>
        <p>— ${quoteObj.author}</p>
        <p style="font-style: italic;">Category: ${quoteObj.category}</p>
    `;

    quoteText.innerHTML = newHTML;
}

