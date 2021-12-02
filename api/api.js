const express = require('express');
var bodyParser = require('body-parser')
const app = express();

var fs = require('fs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { dirname } = require('path');
const appDir = dirname(require.main.filename);


app.get('/api/idee', (req, res) => {

    var data = fs.readFileSync(appDir + '/idee.json');
    var myObject = JSON.parse(data);
    res.send(myObject);
});

app.post('/api/idee', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    // memorize the data in the local json
    //  res.sendStatus(200);

    // lettura file json e estrazione dati
    var data = fs.readFileSync(appDir + '/idee.json');
    var myObject = JSON.parse(data);


    // creazione nuovo elemento 
    let newIdea = {
        "partenza": req.body['partenza'],
        "destinazione": req.body['destinazione'],
        
    };

    //aggiunta nuovo elemento
    myObject.idee.push(newIdea);

    //aggiornamento file json con il nuovo elemento
    var newData = JSON.stringify(myObject);
    fs.writeFile(appDir + '/idee.json', newData, err => {
        // error checking
        if (err) throw err;
    });
    
    
    res.json("Tutto ok");
});

app.listen(3000);