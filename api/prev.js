// username G14
// pass: G14pass

const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const path = require('path');

//CORS module added

var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

var fs = require('fs');

ideaId = 0;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { dirname } = require('path');
const appDir = dirname(require.main.filename);


app.get('/api/idee', (req, res) => {
    console.log("GET IDEE API CALLED");
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

    ideaId++; 
    // creazione nuovo elemento 
    let newIdea = {
        "ID" : ideaId,
        "titolo": req.body['titolo'],
        "descrizione": req.body['descrizione'],
        "partenza": req.body['partenza'],
        "destinazione": req.body['destinazione'],
        "budgetRange":{
            "min": req.body['budgetMin'], 
            "max":req.body['budgetMax'], 
            "valuta":"€"},
        "alloggio": {
            "affittacamere": req.body['affittacamere'],
            "agriturismo": req.body['agriturismo'],
            "appartamenti": req.body['appartamenti'],
            "bnb": req.body['bnb'],
            "baite": req.body['baite'],
            "campeggi": req.body['campeggi'],
            "case_vacanze": req.body['case_vacanze'],
            "hotel": req.body['hotel'],
            "motel": req.body['motel'],
            "ostelli": req.body['ostelli'],
            "pensioni": req.body['pensioni'],
            "residence": req.body['residence'],
            "resort": req.body['resort'],
            "safari": req.body['safari']
        },
        "personeRange":{
            "min": req.body['partecipantiMin'], 
            "max": req.body['partecipantiMax']},
        "etaRange":{
            "min": req.body['etaMin'], 
            "max": req.body['etaMax']},
        "mezzi":{

        },
        "durataViaggio":{
            "durataMin": req.body['durataMin'], 
            "durataMax":req.body['durataMax']
        },
        "attivita": {
            "affittacamere": req.body['affittacamere'],
            "agriturismo": req.body['agriturismo'],
            "appartamenti": req.body['appartamenti'],
            "bnb": req.body['bnb'],
            "baite": req.body['baite'],
            "campeggi": req.body['campeggi'],
            "case_vacanze": req.body['case_vacanze'],
            "hotel": req.body['hotel'],
            "motel": req.body['motel'],
            "ostelli": req.body['ostelli'],
            "pensioni": req.body['pensioni'],
            "residence": req.body['residence'],
            "resort": req.body['resort'],
            "safari": req.body['safari']
        }
    };

    //aggiunta nuovo elemento
    myObject.idee.push(newIdea);

    //aggiornamento file json con il nuovo elemento
    var newData = JSON.stringify(myObject);
    fs.writeFile(appDir + '/idee.json', newData, err => {
        // error checking
        if (err) throw err;
    });


    res.status(204).send();
});




app.get('/api/gruppi', (req, res) => {
    console.log("GET GRUPPI API CALLED");
    var data = fs.readFileSync(appDir + '/gruppi.json');
    var myObject = JSON.parse(data);
    res.send(myObject);
});

app.post('/api/gruppi', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);

    var data = fs.readFileSync(appDir + '/gruppi.json');
    var myObject = JSON.parse(data);

    let newGruppo = {
        "partenza": req.body['partenza'],
        "destinazione": req.body['destinazione'],
    };

    myObject.gruppi.push(newGruppo);

    var newData = JSON.stringify(myObject);
    fs.writeFile(appDir + '/gruppi.json', newData, err => {
        if (err) throw err;
    });

    res.status(200).send();
});


app.listen(3000);
console.log('Server is listening on port 3000');    