const app = document.getElementById('root');
const container = document.createElement('div');
// const req = require("express/lib/request");

container.setAttribute('class', 'container');

var t = document.createElement("card");
app.appendChild(container);

// Begin accessing JSON data here

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/idee', true);

request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(request.status)
    if (request.status >= 200 && request.status < 400) {
        
        data.forEach(idea => {
            
            var node = document.createElement("li");                 // Create a <li> node
            node.setAttribute('class', 'dropdown-item');
                            // Create a <li> node
            // var textnode = document.createTextNode(idea.partenza);         // Create a text node
            node.innerHTML = idea.titolo;                              // Append the text to <li>
            
            node.addEventListener("click", function(){ 
                var request1 = new XMLHttpRequest();
                request1.open("POST",  'http://localhost:3000/api/gruppi', true);
                request1.setRequestHeader("Content-Type", "application/json");
               
                request1.send(JSON.stringify(idea));
                request1.onload = function() {
                    // Do whatever with response
                    alert(request1.responseText)
                }
             }); 

            

            node.onclick = function(){
                location.reload(true);
                }
                document.getElementById("drop-menu3").append(node); 
            
            
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}

request.send();



const container1 = document.createElement('div');
container1.setAttribute('class', 'container');

var t1 = document.createElement("card");
app.appendChild(container1);

var request1 = new XMLHttpRequest();
request1.open('GET', 'http://localhost:3000/api/gruppi', true);
request1.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    
    if (request1.status >= 200 && request1.status < 400) {
        data.forEach(gruppo => {
            console.log(gruppo);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = gruppo.titolo;
            const p = document.createElement('p');
            p.innerHTML = "<b>Partecipanti:</b> 45";

            container1.appendChild(card);
            card.appendChild(h1);

        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}
request1.send();