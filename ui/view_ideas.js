const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

var t = document.createElement("card");
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/idee', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);


    if (request.status >= 200 && request.status < 400) {
        data.forEach(idea => {
            console.log(idea);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = idea.titolo;
            const descrizione = document.createElement('p'); 
            descrizione.innerHTML = "<b>Descrizione</b> : " + idea.descrizione; 
            const bottone = document.createElement('button'); 
            
            bottone.setAttribute('type', 'button '); 
            bottone.setAttribute('class', 'btn btn-primary float-right'); 

            const cestino = document.createElement('i'); 
            cestino.setAttribute('style', "font-size:24px")
            cestino.setAttribute('class', "fa")
            cestino.innerHTML = "&#xf014";

            bottone.addEventListener("click", function(){ 
              
                var request2 = new XMLHttpRequest();
                console.log(idea.id); 
                request2.open("DELETE",  'http://localhost:3000/api/idee/' + idea.IdeaID );
                console.log("deleted" + idea.id);
                request2.send();
             });

            bottone.appendChild(cestino) ; 
            h1.appendChild(bottone); 

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(descrizione); 
            

        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}
request.send();
 