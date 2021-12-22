const app = require("../api/api");
const test = require("tape");
const request = require("supertest");

test('GET /api/idee', function (assert) {
    request(app)
        .get('/api/idee')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            assert.error(err, 'No error');
            assert.true(res.body.length > 0, 'A non-empty collection is returned');
            assert.end();
        });
});

test('POST /api/idee', function (assert) {
    request(app)
        .post('/api/idee')
        .send({
            "titolo":"Viaggio Esotico",
            "descrizione":"Un viaggio in Uzbekistan per le vacanze di natale",
            "partenza":"Povo","destinazione":"Tashkent",
            "budgetRange":{"min":"1000","max":"5000","valuta":"€"},
            "alloggio":{"affittacamere":false,"agriturismo":false,"appartamenti":true,"bnb":false,"baite":false,"campeggi":false,"case_vacanze":false,"hotel":true,"motel":false,"ostelli":false,"pensioni":true,"residence":false,"resort":false,"safari":true},
            "personeRange":{"min":"2","max":"4"},"etaRange":{"min":"18","max":"25"},
            "mezzi":{},
            "durataViaggio":{"durataMin":"10","durataMax":"15"},
            "attivita":{"crociera":false,"escursioni":false,"eventi":false,"montagna":false,"moda_shopping":true,"movida":false,"musei":false,"parco_avventura":true,"parco_natura":false,"pellegrinaggio":true,"mare":false,"sport":true,"tour_enogastronomici":false,"sorprese":true}
        })
        .expect(204)
        .end(function (err, res) {
            assert.error(err, 'No error');
            assert.end();
        });
});

test('DELETE /api/idee', function (assert) {
    request(app)
        .del('/api/idee/000000000000')
        .expect(200)
        .end(function (err, res) {
            if (err) {
                reject(new Error('An error occured with the idea deletion API, err: ' + err))
            }
            
            assert.error(err, 'No error');
            assert.isEqual("Idea deleted successfully", res.body, 'The DELETE response delivers a good body');
            assert.end();
        });
});

console.log("Server will remain on, kill it if needed")