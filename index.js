
const express = require('express'); 
const app = express(); 

const { dirname } = require('path');
const appDir = dirname(require.main.filename);


app.get('/',function(req,res) {
    res.sendFile(appDir + '/index.html');
  });

app.listen(process.env.port || 3000);


