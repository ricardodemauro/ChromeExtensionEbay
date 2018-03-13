const request = require("request");
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/slug/:keyword', function(req, res) {
    const data = req.params.keyword;
    const url = 'https://autosug.ebay.com/autosug?kwd=' + data + '&_jgr=1&sId=0&_ch=0&callback=nil';
    request.get(url, (error, response, body) => {
        const content = body.replace("/**/nil(","").replace("}})", "}}");
        const json = JSON.parse(content);
        res.json(json.res.sug);
    }); 
})  

app.get('/asset/:product', function(req, res) {
    const product = req.params.product
    const url = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=RicardoM-sampleke-PRD-6f1a91299-0d0b7d55&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + product + '&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US&siteid=0';
    request.get(url, (error, response, body) => {
        const json = JSON.parse(body);
        res.json({ totalEntries: json.findItemsByKeywordsResponse[0].paginationOutput[0].totalEntries[0], name: req.params.product });
    });
})

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

