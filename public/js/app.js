
console.log('Client side java script file is loaded!!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const meassageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    
    //const  url = 'http://localhost:3001/weather?address=' + encodeURIComponent(location);
    // while running on heroku
    const  url = '/weather?address=' + encodeURIComponent(location);
    meassageOne.textContent = 'Loading.....';
    messageTwo.textContent = '';
    
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            meassageOne.textContent= 'Error';
            messageTwo.textContent = data.error;
        } else {
            meassageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})