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
            console.log(idea);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');


            const h1 = document.createElement('h1');
            h1.textContent = idea.partenza + " " + idea.destinazione;



            container.appendChild(card);
            card.appendChild(h1);

        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}
request.send();


// ask
// come faccio a fare una get dalle idee di viaggio x
// e poi per far vedere le idee faccio un for
// è corretto che devo andare dentro la cartella api per node start
// la documentazione di swagger va solo sulle api ? 