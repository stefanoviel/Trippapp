var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest(); 
request.open('GET', 'https://localhost:3000/api/idee', false); 
request.onreadystatechange = function (){
    console.log("readyState = " + this.readyState + ", status = " + this.status);
    
    try{
        console.log(this.response); 
        var data = JSON.parse(this.response); 
    }
    catch(errror){
        console.error("Not a JSON response")
    }

    console.log("ok"); 
}

request.send()





// ask
// come faccio a fare una get dalle idee di viaggio x
// e poi per far vedere le idee faccio un for
// è corretto che devo andare dentro la cartella api per node start
// la documentazione di swagger va solo sulle api ? 