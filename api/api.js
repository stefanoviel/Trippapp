var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();

//modules to generate APIs documentation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API for My Project',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Group13',
                url:'http://localhost:3000'
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ["api/api.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var MongoClient = require("mongodb").MongoClient;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb+srv://Latios:latiospass@cluster0.ab488.mongodb.net/api"



var cors = require('cors')
app.use(cors())

var ideaId = 0;
var DATABASE = "api";
var database;
var firstConnection = true;

app.listen(3000, () => {

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })

});


/**
 * @swagger
 * /api/idee:
 *   get:
 *     summary: Recupera una lista idee.
 *     description: Recupera una lista di idee dal dal server remoto (MonogDB).
 *     responses:
 *       200:
 *         description: Una lista di idee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID:
 *                         type: Integer
 *                         description: numero identificativo dell'idea
 *                         example: 2
 *                       Titolo:
 *                         type: string
 *                         description: Titolo dell'idea
 *                         example: "Viaggio a Parigi"
 *                       Descrizione:
 *                         type: string
 *                         description: Descrizione testuale dell'idea di viaggio
 *                         example: "Mi piacerebbe andare a Parigi per capodanno"
 *                       Partenza:
 *                         type: string
 *                         description: dove ci si trova per partire
 *                         example: "Parcheggio parco de gasperi, Trento"
 *                       Destinazione:
 *                         type: string
 *                         description: Dove si svogle il viaggio
 *                         example: "Parigi"
 *                       BudgetRange:
 *                         type: object
 *                         properties:
 *                           min:
 *                             type: integer
 *                             description: budget minimo
 *                             example: 30
 *                           max:
 *                             type: integer
 *                             description: budget massimo
 *                             example: 200
 *                           valuta:
 *                             type: string
 *                             description: valuta del range
 *                             example: "euro" 
 *                       Alloggio: 
 *                         type: object
 *                         properties:
 *                           affittacamere:
 *                             type: Bool
 *                             description: si o no (affittacamere)
 *                             example: true
 *                           agriturismo:
 *                             type: Bool
 *                             description: si o no (agriturismo)
 *                             example: true
 *                           appartamenti:
 *                             type: Bool
 *                             description: si o no (appartamenti)
 *                             example: true
 *                           bnb:
 *                             type: Bool
 *                             description: si o no (bnb)
 *                             example: true
 *                           baite:
 *                             type: Bool
 *                             description: si o no (baite)
 *                             example: false
 *                           campeggi:
 *                             type: Bool
 *                             description: si o no (campeggi)
 *                             example: false
 *                           case_vacanze:
 *                             type: Bool
 *                             description: si o no (case_vacante)
 *                             example: false
 *                           hotel:
 *                             type: Bool
 *                             description: si o no (hotel)
 *                             example: true
 *                           motel:
 *                             type: Bool
 *                             description: si o no (motel)
 *                             example: true
 *                           ostelli:
 *                             type: Bool
 *                             description: si o no (ostelli)
 *                             example: true
 *                           pensioni:
 *                             type: Bool
 *                             description: si o no (pensioni)
 *                             example: false
 *                           residence:
 *                             type: Bool
 *                             description: si o no (residence)
 *                             example: false
 *                           resort:
 *                             type: Bool
 *                             description: si o no (resort)
 *                             example: false
 *                           safari:
 *                             type: Bool
 *                             description: si o no (safari)
 *                             example: false                          
 *                       PersoneRange:
 *                         type: object
 *                         properties:
 *                           min:
 *                             type: integer
 *                             description: numero minimo di persone per il viaggio
 *                             example: 5
 *                           max:
 *                             type: integer
 *                             description: numero massimo di persone per il viaggio
 *                             example: 40
 *                       EtaRange:
 *                         type: object
 *                         properties:
 *                           min:
 *                             type: integer
 *                             description: età minima per il viaggio
 *                             example: 18
 *                           max:
 *                             type: integer
 *                             description: età massima per il viaggio
 *                             example: 70
 *                       Mezzi:
 *                         type: object
 *                         properties:
 *                           aereo:
 *                             type: bool
 *                             description: si o no (aereo)
 *                             example: true
 *                           automobile:
 *                             type: bool
 *                             description: si o no (automobile)
 *                             example: false
 *                           autobus:
 *                             type: bool
 *                             description: si o no (autobus)
 *                             example: false
 *                           nave:
 *                             type: bool
 *                             description: si o no (nave)
 *                             example: false
 *                           traghetto:
 *                             type: bool
 *                             description: si o no (traghetto)
 *                             example: false
 *                           treno:
 *                             type: bool
 *                             description: si o no (treno)
 *                             example: true                                                    
 *                       DurataViaggio:
 *                         type: object
 *                         properties:
 *                           durataMin:
 *                             type: integer
 *                             description: durata minima in giorni del viggio
 *                             example: 3
 *                           durataMax:
 *                             type: integer
 *                             description: durata massima in giorni del viggio
 *                             example: 24  
 *                       Attivita: 
 *                         type: object
 *                         properties:
 *                           crociera:
 *                             type: bool
 *                             description: si o no (crociera)
 *                             example: false
 *                           escursioni:
 *                             type: bool
 *                             description: si o no (escursioni)
 *                             example: false
 *                           eventi:
 *                             type: bool
 *                             description: si o no (eventi)
 *                             example: true
 *                           montagna:
 *                             type: bool
 *                             description: si o no (montagna)
 *                             example: false
 *                           moda_shopping:
 *                             type: bool
 *                             description: si o no (moda_shopping)
 *                             example: true
 *                           movida:
 *                             type: bool
 *                             description: si o no (movida)
 *                             example: true
 *                           musei:
 *                             type: bool
 *                             description: si o no (musei)
 *                             example: true
 *                           parco_avventura:
 *                             type: bool
 *                             description: si o no (parco_avventura)
 *                             example: false
 *                           parco_natura:
 *                             type: bool
 *                             description: si o no (parco_natura)
 *                             example: false
 *                           pellegrinaggio:
 *                             type: bool
 *                             description: si o no (pellegrinaggio)
 *                             example: false
 *                           mare:
 *                             type: bool
 *                             description: si o no (mare)
 *                             example: false
 *                           sport:
 *                             type: bool
 *                             description: si o no (sport)
 *                             example: false
 *                           tour_enogastronomici:
 *                             type: bool
 *                             description: si o no (tour_enogastronomici)
 *                             example: true
 *                           sorprese:
 *                             type: bool
 *                             description: si o no (sorprese)
 *                             example: true
 * 
 * 
 *                      
 * 
 *                       
 */

app.get('/api/idee', (request, response) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        if (firstConnection) {
            console.log("Mongo DB Connection Successful");
            firstConnection = false;
        }
        console.log("GET IDEE API CALLED");
        database.collection("ideas").find({}).toArray((error, result) => {
            if (error) {
                console.log(error);
            }

            response.send(result);
        })
    })
})

/**
 * @swagger
 * /api/idee:
 *   post:
 *     summary: Creazione di un idea.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: Integer
 *                 description: numero identificativo dell'idea
 *                 example: 2
 *               Titolo:
 *                 type: string
 *                 description: Titolo dell'idea
 *                 example: "Viaggio a Parigi"
 *               Descrizione:
 *                 type: string
 *                 description: Descrizione testuale dell'idea di viaggio
 *                 example: "Mi piacerebbe andare a Parigi per capodanno"
 *               Partenza:
 *                 type: string
 *                 description: dove ci si trova per partire
 *                 example: "Parcheggio parco de gasperi, Trento"
 *               Destinazione:
 *                 type: string
 *                 description: Dove si svogle il viaggio
 *                 example: "Parigi"
 *               BudgetRange:
 *                 properties:
 *                   min:
 *                     type: integer
 *                     description: budget minimo
 *                     example: 30
 *                   max:
 *                     type: integer
 *                     description: budget massimo
 *                     example: 200
 *                   valuta:
 *                     type: string
 *                     description: valuta del range
 *                     example: "euro" 
 *               Alloggio: 
 *                 type: object
 *                 properties:
 *                   affittacamere:
 *                     type: Bool
 *                     description: si o no (affittacamere)
 *                     example: true
 *                   agriturismo:
 *                     type: Bool
 *                     description: si o no (agriturismo)
 *                     example: true
 *                   appartamenti:
 *                     type: Bool
 *                     description: si o no (appartamenti)
 *                     example: true
 *                   bnb:
 *                     type: Bool
 *                     description: si o no (bnb)
 *                     example: false
 *                   baite:
 *                     type: Bool
 *                     description: si o no (baite)
 *                     example: false
 *                   campeggi:
 *                     type: Bool
 *                     description: si o no (campeggi)
 *                     example: false
 *                   case_vacanze:
 *                     type: Bool
 *                     description: si o no (case_vacante)
 *                     example: false
 *                   hotel:
 *                     type: Bool
 *                     description: si o no (hotel)
 *                     example: true
 *                   motel:
 *                     type: Bool
 *                     description: si o no (motel)
 *                     example: true
 *                   ostelli:
 *                     type: Bool
 *                     description: si o no (ostelli)
 *                     example: true
 *                   pensioni:
 *                     type: Bool
 *                     description: si o no (pensioni)
 *                     example: false
 *                   residence:
 *                     type: Bool
 *                     description: si o no (residence)
 *                     example: false
 *                   resort:
 *                     type: Bool
 *                     description: si o no (resort)
 *                     example: false
 *                   safari:
 *                     type: Bool
 *                     description: si o no (safari)
 *                     example: false                                
 *               PersoneRange:
 *                 type: object
 *                 properties:
 *                   min:
 *                     type: integer
 *                     description: numero minimo di persone per il viaggio
 *                     example: 5
 *                   max:
 *                     type: integer
 *                     description: numero massimo di persone per il viaggio
 *                     example: 40
 *               EtaRange:
 *                 type: object
 *                 properties:
 *                   min:
 *                     type: integer
 *                     description: età minima per il viaggio
 *                     example: 18
 *                   max:
 *                     type: integer
 *                     description: età massima per il viaggio
 *                     example: 70
 *               Mezzi:
 *                 type: object
 *                 properties:
 *                   aereo:
 *                     type: bool
 *                     description: si o no (aereo)
 *                     example: true
 *                   automobile:
 *                     type: bool
 *                     description: si o no (automobile)
 *                     example: false
 *                   autobus:
 *                     type: bool
 *                     description: si o no (autobus)
 *                     example: false
 *                   nave:
 *                     type: bool
 *                     description: si o no (nave)
 *                     example: false
 *                   traghetto:
 *                     type: bool
 *                     description: si o no (traghetto)
 *                     example: false
 *                   treno:
 *                     type: bool
 *                     description: si o no (treno)
 *                     example: true
 *               DurataViaggio:
 *                 type: object
 *                 properties:
 *                   durataMin:
 *                     type: integer
 *                     description: durata minima in giorni del viggio
 *                     example: 3
 *                   durataMax:
 *                     type: integer
 *                     description: durata massima in giorni del viggio
 *                     example: 24  
 *               Attivita: 
 *                 type: object
 *                 properties:
 *                   crociera:
 *                     type: bool
 *                     description: si o no (crociera)
 *                     example: false
 *                   escursioni:
 *                     type: bool
 *                     description: si o no (escursioni)
 *                     example: false
 *                   eventi:
 *                     type: bool
 *                     description: si o no (eventi)
 *                     example: true
 *                   montagna:
 *                     type: bool
 *                     description: si o no (montagna)
 *                     example: false
 *                   moda_shopping:
 *                     type: bool
 *                     description: si o no (moda_shopping)
 *                     example: true
 *                   movida:
 *                     type: bool
 *                     description: si o no (movida)
 *                     example: true
 *                   musei:
 *                     type: bool
 *                     description: si o no (musei)
 *                     example: true
 *                   parco_avventura:
 *                     type: bool
 *                     description: si o no (parco_avventura)
 *                     example: false
 *                   parco_natura:
 *                     type: bool
 *                     description: si o no (parco_natura)
 *                     example: false
 *                   pellegrinaggio:
 *                     type: bool
 *                     description: si o no (pellegrinaggio)
 *                     example: false
 *                   mare:
 *                     type: bool
 *                     description: si o no (mare)
 *                     example: false
 *                   sport:
 *                     type: bool
 *                     description: si o no (sport)
 *                     example: false
 *                   tour_enogastronomici:
 *                     type: bool
 *                     description: si o no (tour_enogastronomici)
 *                     example: true
 *                   sorprese:
 *                     type: bool
 *                     description: si o no (sorprese)
 *                     example: true 
 *     responses:
 *       204:
 *         description: successful executed
*/

app.post('/api/idee', (request, response) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        if (firstConnection) {
            console.log("Mongo DB Connection Successful");
            firstConnection = false;
        }
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

            response.json("New idea added successfully");
        })
    })
}); 

/**
 * @swagger
 * /api/idee/:id:
 *   delete:
 *     summary: elimina un'idea.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: int
 *         required: true
 *         description: l'id dell idea
 *     responses:
 *       200:
 *         description: l'idea è stata eliminata
 *       404:
 *         description: l'dea non è stata trovata
*/

app.delete('/api/idee/:id', (request, response) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        if (firstConnection) {
            console.log("Mongo DB Connection Successful");
            firstConnection = false;
        }
        console.log("DELETE GRUPPI API CALLED");

        database.collection("ideas").deleteOne({
            IdeaID: parseInt(request.params.id)
        });

        response.json("Idea deleted successfully");
    })
}); 

/**
 * @swagger
 * /api/gruppi:
 *   get:
 *     summary: Recupera una lista di Gruppi.
 *     description: Recupera una lista di Gruppi dal server remoto (MonogDB).
 *     responses:
 *       200:
 *         description: Una lista di gruppi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID:
 *                         type: Integer
 *                         description: numero identificativo del gruppo
 *                         example: 32
 *                       Titolo:
 *                         type: string
 *                         description: titolo del gruppo
 *                         example: "Andiamo a Parigi"
 *                       Descrizione:
 *                         type: string
 *                         description: descrizione del gruppo
 *                         example: "Gruppo creato il 21_20_2021 ulteriori specifiche del gruppo specificate di seguito"
 *                       Idea_gruppo:
 *                         type: object
 *                         properties:
 *                           Titolo:
 *                             type: string
 *                             description: Titolo dell'idea
 *                             example: "Viaggio a Parigi"
 *                           Descrizione:
 *                             type: string
 *                             description: Descrizione testuale dell'idea di viaggio
 *                             example: "Mi piacerebbe andare a Parigi per capodanno"
 *                           Partenza:
 *                             type: string
 *                             description: dove ci si trova per partire
 *                             example: "Parcheggio parco de gasperi, Trento"
 *                           Destinazione:
 *                             type: string
 *                             description: Dove si svogle il viaggio
 *                             example: "Parigi"
 *                           BudgetRange:
 *                             type: object
 *                             properties:
 *                               min:
 *                                 type: integer
 *                                 description: budget minimo
 *                                 example: 30
 *                               max:
 *                                 type: integer
 *                                 description: budget massimo
 *                                 example: 200
 *                               valuta:
 *                                 type: string
 *                                 description: valuta del range
 *                                 example: "euro" 
 *                           Alloggio: 
 *                             type: object
 *                             properties:
 *                               affittacamere:
 *                                 type: Bool
 *                                 description: si o no (affittacamere)
 *                                 example: true
 *                               agriturismo:
 *                                 type: Bool
 *                                 description: si o no (agriturismo)
 *                                 example: true
 *                               appartamenti:
 *                                 type: Bool
 *                                 description: si o no (appartamenti)
 *                                 example: true
 *                               bnb:
 *                                 type: Bool
 *                                 description: si o no (bnb)
 *                                 example: false
 *                               baite:
 *                                 type: Bool
 *                                 description: si o no (baite)
 *                                 example: false
 *                               campeggi:
 *                                 type: Bool
 *                                 description: si o no (campeggi)
 *                                 example: false
 *                               case_vacanze:
 *                                 type: Bool
 *                                 description: si o no (case_vacante)
 *                                 example: false
 *                               hotel:
 *                                 type: Bool
 *                                 description: si o no (hotel)
 *                                 example: true
 *                               motel:
 *                                 type: Bool
 *                                 description: si o no (motel)
 *                                 example: true
 *                               ostelli:
 *                                 type: Bool
 *                                 description: si o no (ostelli)
 *                                 example: true
 *                               pensioni:
 *                                 type: Bool
 *                                 description: si o no (pensioni)
 *                                 example: false
 *                               residence:
 *                                 type: Bool
 *                                 description: si o no (residence)
 *                                 example: false
 *                               resort:
 *                                 type: Bool
 *                                 description: si o no (resort)
 *                                 example: false
 *                               safari:
 *                                 type: Bool
 *                                 description: si o no (safari)
 *                                 example: false                            
 *                           PersoneRange:
 *                             type: object
 *                             properties:
 *                               min:
 *                                 type: integer
 *                                 description: numero minimo di persone per il viaggio
 *                                 example: 5
 *                               max:
 *                                 type: integer
 *                                 description: numero massimo di persone per il viaggio
 *                                 example: 40
 *                           EtaRange:
 *                             type: object
 *                             properties:
 *                               min:
 *                                 type: integer
 *                                 description: età minima per il viaggio
 *                                 example: 18
 *                               max:
 *                                 type: integer
 *                                 description: età massima per il viaggio
 *                                 example: 70
 *                           Mezzi:
 *                             type: object
 *                             properties:
 *                               aereo:
 *                                 type: bool
 *                                 description: si o no (aereo)
 *                                 example: true
 *                               automobile:
 *                                 type: bool
 *                                 description: si o no (automobile)
 *                                 example: false
 *                               autobus:
 *                                 type: bool
 *                                 description: si o no (autobus)
 *                                 example: false
 *                               nave:
 *                                 type: bool
 *                                 description: si o no (nave)
 *                                 example: false
 *                               traghetto:
 *                                 type: bool
 *                                 description: si o no (traghetto)
 *                                 example: false
 *                               treno:
 *                                 type: bool
 *                                 description: si o no (treno)
 *                                 example: true
 *                           DurataViaggio:
 *                             type: object
 *                             properties:
 *                               durataMin:
 *                                 type: integer
 *                                 description: durata minima in giorni del viggio
 *                                 example: 3
 *                               durataMax:
 *                                 type: integer
 *                                 description: durata massima in giorni del viggio
 *                                 example: 24  
 *                           Attivita: 
 *                             type: object
 *                             properties:
 *                               crociera:
 *                                 type: bool
 *                                 description: si o no (crociera)
 *                                 example: false
 *                               escursioni:
 *                                 type: bool
 *                                 description: si o no (escursioni)
 *                                 example: false
 *                               eventi:
 *                                 type: bool
 *                                 description: si o no (eventi)
 *                                 example: true
 *                               montagna:
 *                                 type: bool
 *                                 description: si o no (montagna)
 *                                 example: false
 *                               moda_shopping:
 *                                 type: bool
 *                                 description: si o no (moda_shopping)
 *                                 example: true
 *                               movida:
 *                                 type: bool
 *                                 description: si o no (movida)
 *                                 example: true
 *                               musei:
 *                                 type: bool
 *                                 description: si o no (musei)
 *                                 example: true
 *                               parco_avventura:
 *                                 type: bool
 *                                 description: si o no (parco_avventura)
 *                                 example: false
 *                               parco_natura:
 *                                 type: bool
 *                                 description: si o no (parco_natura)
 *                                 example: false
 *                               pellegrinaggio:
 *                                 type: bool
 *                                 description: si o no (pellegrinaggio)
 *                                 example: false
 *                               mare:
 *                                 type: bool
 *                                 description: si o no (mare)
 *                                 example: false
 *                               sport:
 *                                 type: bool
 *                                 description: si o no (sport)
 *                                 example: false
 *                               tour_enogastronomici:
 *                                 type: bool
 *                                 description: si o no (tour_enogastronomici)
 *                                 example: true
 *                               sorprese:
 *                                 type: bool
 *                                 description: si o no (sorprese)
 *                                 example: true
 *                       Partecipanti:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: Nome dei partecipanti del gruppo
 *                           example: "Jonny"
 *                       amministratori:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: Nome degli amministratori
 *                           example: "Jonny"
 *                       richiedenti:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: Nome degli utenti che richiedono l'accesso al gruppo
 *                           example: "Janna"
 *                       espulsi:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: Nome degli utenti espulsi da gruppo
 *                           example: "James"
 *                       chiuso:
 *                         type: bool
 *                         description: si o no (chiusura del gruppo)
 *                         example: false
 *                            
 */

app.get('/api/gruppi', (request, response) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        if (firstConnection) {
            console.log("Mongo DB Connection Successful");
            firstConnection = false;
        }
        console.log("GET GRUPPI API CALLED");
        database.collection("gruppi").find({}).toArray((error, result) => {
            if (error) {
                console.log(error);
            }
            response.send(result);
        })
    })
}); 

gruppiId = 0;

/**
 * @swagger
 * /api/gruppi:
 *   post:
 *     summary: Creazione di un gruppo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: Integer
 *                 description: numero identificativo del gruppo
 *                 example: 32
 *               Titolo:
 *                 type: string
 *                 description: titolo del gruppo
 *                 example: "Andiamo a Parigi"
 *               Descrizione:
 *                 type: string
 *                 description: descrizione del gruppo
 *                 example: "Gruppo creato il 21_20_2021 ulteriori specifiche del gruppo specificate di seguito"
 *               Idea_gruppo:
 *                 type: object
 *                 properties:
 *                   Titolo:
 *                     type: string
 *                     description: Titolo dell'idea
 *                     example: "Viaggio a Parigi"
 *                   Descrizione:
 *                     type: string
 *                     description: Descrizione testuale dell'idea di viaggio
 *                     example: "Mi piacerebbe andare a Parigi per capodanno"
 *                   Partenza:
 *                     type: string
 *                     description: dove ci si trova per partire
 *                     example: "Parcheggio parco de gasperi, Trento"
 *                   Destinazione:
 *                     type: string
 *                     description: Dove si svogle il viaggio
 *                     example: "Parigi"
 *                   BudgetRange:
 *                     type: object
 *                     properties:
 *                       min:
 *                         type: integer
 *                         description: budget minimo
 *                         example: 30
 *                       max:
 *                         type: integer
 *                         description: budget massimo
 *                         example: 200
 *                       valuta:
 *                         type: string
 *                         description: valuta del range
 *                         example: "euro" 
 *                   Alloggio: 
 *                     type: object
 *                     properties:
 *                       affittacamere:
 *                         type: Bool
 *                         description: si o no (affittacamere)
 *                         example: true
 *                       agriturismo:
 *                         type: Bool
 *                         description: si o no (agriturismo)
 *                         example: true
 *                       appartamenti:
 *                         type: Bool
 *                         description: si o no (appartamenti)
 *                         example: true
 *                       bnb:
 *                         type: Bool
 *                         description: si o no (bnb)
 *                         example: false
 *                       baite:
 *                         type: Bool
 *                         description: si o no (baite)
 *                         example: false
 *                       campeggi:
 *                         type: Bool
 *                         description: si o no (campeggi)
 *                         example: false
 *                       case_vacanze:
 *                         type: Bool
 *                         description: si o no (case_vacante)
 *                         example: false
 *                       hotel:
 *                         type: Bool
 *                         description: si o no (hotel)
 *                         example: true
 *                       motel:
 *                         type: Bool
 *                         description: si o no (motel)
 *                         example: true
 *                       ostelli:
 *                         type: Bool
 *                         description: si o no (ostelli)
 *                         example: true
 *                       pensioni:
 *                         type: Bool
 *                         description: si o no (pensioni)
 *                         example: false
 *                       residence:
 *                         type: Bool
 *                         description: si o no (residence)
 *                         example: false
 *                       resort:
 *                         type: Bool
 *                         description: si o no (resort)
 *                         example: false
 *                       safari:
 *                         type: Bool
 *                         description: si o no (safari)
 *                         example: false                            
 *                   PersoneRange:
 *                     type: object
 *                     properties:
 *                       min:
 *                         type: integer
 *                         description: numero minimo di persone per il viaggio
 *                         example: 5
 *                       max:
 *                         type: integer
 *                         description: numero massimo di persone per il viaggio
 *                         example: 40
 *                   EtaRange:
 *                     type: object
 *                     properties:
 *                       min:
 *                         type: integer
 *                         description: età minima per il viaggio
 *                         example: 18
 *                       max:
 *                         type: integer
 *                         description: età massima per il viaggio
 *                         example: 70
 *                   Mezzi:
 *                     type: object
 *                     properties:
 *                       aereo:
 *                         type: bool
 *                         description: si o no (aereo)
 *                         example: true
 *                       automobile:
 *                         type: bool
 *                         description: si o no (automobile)
 *                         example: false
 *                       autobus:
 *                         type: bool
 *                         description: si o no (autobus)
 *                         example: false
 *                       nave:
 *                         type: bool
 *                         description: si o no (nave)
 *                         example: false
 *                       traghetto:
 *                         type: bool
 *                         description: si o no (traghetto)
 *                         example: false
 *                       treno:
 *                         type: bool
 *                         description: si o no (treno)
 *                         example: true
 *                   DurataViaggio:
 *                     type: object
 *                     properties:
 *                       durataMin:
 *                         type: integer
 *                         description: durata minima in giorni del viggio
 *                         example: 3
 *                       durataMax:
 *                         type: integer
 *                         description: durata massima in giorni del viggio
 *                         example: 24  
 *                   Attivita: 
 *                     type: object
 *                     properties:
 *                       crociera:
 *                         type: bool
 *                         description: si o no (crociera)
 *                         example: false
 *                       escursioni:
 *                         type: bool
 *                         description: si o no (escursioni)
 *                         example: false
 *                       eventi:
 *                         type: bool
 *                         description: si o no (eventi)
 *                         example: true
 *                       montagna:
 *                         type: bool
 *                         description: si o no (montagna)
 *                         example: false
 *                       moda_shopping:
 *                         type: bool
 *                         description: si o no (moda_shopping)
 *                         example: true
 *                       movida:
 *                         type: bool
 *                         description: si o no (movida)
 *                         example: true
 *                       musei:
 *                         type: bool
 *                         description: si o no (musei)
 *                         example: true
 *                       parco_avventura:
 *                         type: bool
 *                         description: si o no (parco_avventura)
 *                         example: false
 *                       parco_natura:
 *                         type: bool
 *                         description: si o no (parco_natura)
 *                         example: false
 *                       pellegrinaggio:
 *                         type: bool
 *                         description: si o no (pellegrinaggio)
 *                         example: false
 *                       mare:
 *                         type: bool
 *                         description: si o no (mare)
 *                         example: false
 *                       sport:
 *                         type: bool
 *                         description: si o no (sport)
 *                         example: false
 *                       tour_enogastronomici:
 *                         type: bool
 *                         description: si o no (tour_enogastronomici)
 *                         example: true
 *                       sorprese:
 *                         type: bool
 *                         description: si o no (sorprese)
 *                         example: true
 *               Partecipanti:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Nome dei partecipanti del gruppo
 *                   example: "Jonny"
 *               amministratori:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Nome degli amministratori
 *                   example: "Jonny"
 *               richiedenti:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Nome degli utenti che richiedono l'accesso al gruppo
 *                   example: "Janna"
 *               espulsi:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Nome degli utenti espulsi da gruppo
 *                   example: "James"
 *               chiuso:
 *                 type: bool
 *                 description: si o no (chiusura del gruppo)
 *                 example: false 
 *     responses:
 *       204:
 *         description: successful executed
*/

app.post('/api/gruppi', (request, response) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        if (firstConnection) {
            console.log("Mongo DB Connection Successful");
            firstConnection = false;
        }
        console.log("POST GRUPPI API CALLED");
        console.log(request.body); 
        database.collection("gruppi").count({}, function (error, numOfDocs) {
            if (error) {
                console.log(error);
            }

            database.collection("gruppi").insertOne({
                GruppiID: gruppiId + 1,
                titolo: request.body['titolo'],
                descrizione: request.body['descrizione'],
                partenza : request.body['partenza'],
                destinazione : request.body['destinazione'],
                Idea_gruppo: request.body,
                amministratore: {},
                richiedenti: {},
                espulsi: {},
                chiuso : false
                
            });

            response.json("New group added successfully");
        })
    })

}); 

module.exports = app;