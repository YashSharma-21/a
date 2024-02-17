const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("form input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", event => 
{
    
    event.preventDefault();

    const location = encodeURIComponent(searchElement.value);
    const url = `/weather?address=${location}`;

    messageOne.innerHTML = "Loading...";
    messageTwo.innerHTML = "";

    fetch(url).then(response => response.json()).then(data => 
    {
        if(data.error)
        {
            messageOne.innerHTML = data.error;
            
        } 
        
        else 
        {
            messageOne.innerHTML = `${data.location}`;
            messageTwo.innerHTML = `${data.forecast}`;
            // console.log(data.forecast,data.location);
        }
    });


}); 