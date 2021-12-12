const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const path = require('path');

//CORS module added

var cors = require('cors')
app.use(cors())

var fs = require('fs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { dirname } = require('path');
const appDir = dirname(require.main.filename);


app.get('/api/idee', (req, res) => {
    console.log("GET IDEE API CALLED");
    var data = fs.readFileSync(appDir + '/idee.json');
    var myObject = JSON.parse(data);
    res.send(myObject);
});

app.post('/api/idee',  (req, res) => {
    console.log('Got body:', req.body);
    // memorize the data in the local json
    //  res.sendStatus(200);

    // lettura file json e estrazione dati
    var data = fs.readFileSync(appDir + '/idee.json');
    var myObject = JSON.parse(data);


    // creazione nuovo elemento 
    let newIdea = {
        "partenza": req.body['partenza'],
        "destinazione": req.body['destinazione']
    };

    //aggiunta nuovo elemento
    myObject.idee.push(newIdea);

    //aggiornamento file json con il nuovo elemento
    var newData = JSON.stringify(myObject);
    fs.writeFile(appDir + '/idee.json', newData, err => {
        // error checking
        if (err) throw err;
    });

    console.log(appDir);

    
    // let newStr = appDir.replace('api','ui');
    // console.log(newStr)
    // res.sendFile(path.join(newStr, '/idee_viaggio.html'));
    res.status(204).send();
});


app.get('/api/gruppi', (req, res) => {
    console.log("GET GRUPPI API CALLED");
    var data = fs.readFileSync(appDir + '/gruppi.json');
    var myObject = JSON.parse(data);
    res.send(myObject);
});

app.post('/api/gruppi',  (req, res) => {
    console.log('Got body:', req);
    // memorize the data in the local json
    //  res.sendStatus(200);

    // lettura file json e estrazione dati
    var data = fs.readFileSync(appDir + '/gruppi.json');
    var myObject = JSON.parse(data);


    // creazione nuovo elemento 
    let newGruppo = {
        "partenza": req.body['partenza'],
        "destinazione": req.body['destinazione'],
    };

    //aggiunta nuovo elemento
    myObject.gruppi.push(newGruppo);

    //aggiornamento file json con il nuovo elemento
    var newData = JSON.stringify(myObject);
    fs.writeFile(appDir + '/idee.json', newData, err => {
        // error checking
        if (err) throw err;
    });


    res.status(204).send();
});


app.listen(3000);
console.log('Server is listening on port 3000');