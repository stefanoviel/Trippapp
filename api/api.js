var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var MongoClient = require("mongodb").MongoClient;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb+srv://G14:G14pass@cluster0.ab488.mongodb.net/api"



var cors = require('cors')
app.use(cors())

var ideaId = 0;
var DATABASE = "api";
var database;

app.listen(3000, () => {

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })

});


app.get('/api/idee', (request, response) => {
    console.log("GET IDEE API CALLED");
    database.collection("ideas").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/api/idee', (request, response) => {
    console.log("POST IDEE API CALLED");
    database.collection("ideas").count({}, function (error, numOfDocs) {
        if (error) {
            console.log(error);
        }

        database.collection("ideas").insertOne({
            IdeaID: ideaId + 1,
            titolo: request.body['titolo'],
            descrizione: request.body['descrizione'],
            partenza: request.body['partenza'],
            destinazione: request.body['destinazione'],
            budgetRange:{
                min: request.body['budgetMin'], 
                max:request.body['budgetMax'], 
                valuta:"€"},
            alloggio: {
                affittacamere: !(request.body['affittacamere'] === undefined),
                agriturismo: request.body['agriturismo']  !== undefined,
                appartamenti: request.body['appartamenti'] !== undefined,
                bnb: request.body['bnb'] != undefined,
                baite: request.body['baite'] != undefined,
                campeggi: request.body['campeggi'] != undefined,
                case_vacanze: request.body['case_vacanze'] != undefined,
                hotel: request.body['hotel'] != undefined,
                motel: request.body['motel'] != undefined,
                ostelli: request.body['ostelli'] != undefined,
                pensioni: request.body['pensioni'] != undefined,
                residence: request.body['residence'] != undefined,
                resort: request.body['resort'] != undefined,
                safari: request.body['safari'] != undefined
            },
            personeRange:{
                min: request.body['partecipantiMin'], 
                max: request.body['partecipantiMax']},
            etaRange:{
                min: request.body['etaMin'], 
                max: request.body['etaMax']},
            mezzi:{

            },
            durataViaggio:{
                durataMin: request.body['durataMin'], 
                durataMax:request.body['durataMax']
            },
            attivita: {
                crociera: request.body['crociera'] != undefined,
                escursioni: request.body['escursioni'] != undefined,
                eventi: request.body['eventi'] != undefined,
                montagna: request.body['montagna'] != undefined,
                moda_shopping: request.body['moda_shopping'] != undefined,
                movida: request.body['movida'] != undefined,
                musei: request.body['musei'] != undefined,
                parco_avventura: request.body['parco_avventura'] != undefined,
                parco_natura: request.body['parco_natura'] != undefined,
                pellegrinaggio: request.body['pellegrinaggio'] != undefined,
                mare: request.body['mare'] != undefined,
                sport: request.body['sport'] != undefined,
                tour_enogastronomici: request.body['tour_enogastronomici'] != undefined,
                sorprese: request.body['sorprese'] != undefined 
            }
        });

        response.status(204).send();
    })

}); 

app.delete('/api/idee/:id', (request, response) => {
    console.log("DELETE GRUPPI API CALLED"); 
    console.log(request.params.id ); 

    database.collection("ideas").deleteOne({
        IdeaID: parseInt(request.params.id)
    });

    response.status(204).send();
}); 

app.get('/api/gruppi', (request, response) => {
    console.log("GET GRUPPI API CALLED");
    database.collection("gruppi").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }
        response.send(result);
    })

}); 

gruppiId = 0;

app.post('/api/gruppi', (request, response) => {
    
    console.log("POST GRUPPI API CALLED");
    database.collection("gruppi").count({}, function (error, numOfDocs) {
        if (error) {
            console.log(error);
        }

        database.collection("gruppi").insertOne({
            GruppiID: gruppiId + 1,
            titolo: request.body['titolo'],
            descrizione: request.body['descrizione'],
            Idea_gruppo: request.body,
            amministratore: {},
            richiedenti: {},
            espulsi: {},
            chiuso : false
            
        });

        response.status(204).send();
    })

}); 