const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading.....';
    messageTwo.textContent = '';
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.Error){
            messageOne.textContent = data.Error;
        }else{
            messageOne.textContent = 'Place : '+data.Place;
            messageTwo.textContent ='Forecst : '+data.forecast;
        }
    })
})
})