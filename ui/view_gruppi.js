const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

var t = document.createElement("card");
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/gruppi', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.gruppi.forEach(gruppo => {
            console.log(gruppo);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = gruppo.partenza + " " + gruppo.destinazione;

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
 