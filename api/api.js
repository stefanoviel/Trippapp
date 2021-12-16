var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var MongoClient = require("mongodb").MongoClient;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb+srv://G14:G14pass@cluster0.ab488.mongodb.net/api"



var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/Photos', Express.static(__dirname + '/Photos'));


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
                affittacamere: request.body['affittacamere'],
                agriturismo: request.body['agriturismo'],
                appartamenti: request.body['appartamenti'],
                bnb: request.body['bnb'],
                baite: request.body['baite'],
                campeggi: request.body['campeggi'],
                case_vacanze: request.body['case_vacanze'],
                hotel: request.body['hotel'],
                motel: request.body['motel'],
                ostelli: request.body['ostelli'],
                pensioni: request.body['pensioni'],
                residence: request.body['residence'],
                resort: request.body['resort'],
                safari: request.body['safari']
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
    console.log(request.body.id); 

    database.collection("ideas").deleteOne({
        DepartmentId: parseInt(request.body.id)
    });

    response.json("Deleted Successfully");
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

app.post('/api/gruppi', (request, response) => {
    console.log("POST GRUPPI API CALLED");
    database.collection("gruppi").count({}, function (error, numOfDocs) {
        if (error) {
            console.log(error);
        }

        database.collection("gruppi").insertOne({
            IdeaID: ideaId + 1,
            titolo: request.body['titolo'],
            descrizione: request.body['descrizione'],
            partenza: request.body['partenza'],
            destinazione: request.body['destinazione'],
            
        });

        response.status(204).send();
    })

}); 






// app.get('/api/employee', (request, response) => {

//     database.collection("Employee").find({}).toArray((error, result) => {
//         if (error) {
//             console.log(error);
//         }

//         response.send(result);
//     })

// })

// app.post('/api/employee', (request, response) => {

//     database.collection("Employee").count({}, function (error, numOfDocs) {
//         if (error) {
//             console.log(error);
//         }

//         database.collection("Employee").insertOne({
//             EmployeeId: numOfDocs + 1,
//             EmployeeName: request.body['EmployeeName'],
//             Department: request.body['Department'],
//             DateOfJoining: request.body['DateOfJoining'],
//             PhotoFileName: request.body['PhotoFileName'],
//         });

//         response.json("Added Successfully");
//     })

// })


// app.put('/api/employee', (request, response) => {

//     database.collection("Employee").updateOne(
//         //Filter Criteria
//         {
//             "EmployeeId": request.body['EmployeeId']
//         },
//         //Update
//         {
//             $set:
//             {
//                 EmployeeName: request.body['EmployeeName'],
//                 Department: request.body['Department'],
//                 DateOfJoining: request.body['DateOfJoining'],
//                 PhotoFileName: request.body['PhotoFileName'],
//             }

//         }
//     );

//     response.json("Updated Successfully");
// })



// app.delete('/api/employee/:id', (request, response) => {

//     database.collection("Employee").deleteOne({
//         EmployeeId: parseInt(request.params.id)
//     });

//     response.json("Deleted Successfully");
// })


// app.post('/api/employee/savefile', (request, response) => {

//     fs.writeFile("./Photos/" + request.files.file.name,
//         request.files.file.data, function (err) {
//             if (err) {
//                 console.log(err);
//             }

//             response.json(request.files.file.name);
//         }
//     )
// })