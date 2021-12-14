const app = document.getElementById('root');
const container = document.createElement('div');

container.setAttribute('class', 'container');

var t = document.createElement("card");
app.appendChild(container);

// Begin accessing JSON data here

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/idee', true);

request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        
        data.idee.forEach(idea => {
            
            var node = document.createElement("li");                 // Create a <li> node
            // var textnode = document.createTextNode(idea.partenza);         // Create a text node
            node.innerHTML = idea.partenza;                              // Append the text to <li>
            
            node.addEventListener("click", function(){ 
                var request1 = new XMLHttpRequest();
                request1.open("POST",  'http://localhost:3000/api/gruppi');
                request1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                request1.send(JSON.stringify({"partenza":idea.partenza,"destinazione":idea.destinazione}));
             }); 

            document.getElementById("drop-menu3").appendChild(node); 
            
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}

request.send();
 

    