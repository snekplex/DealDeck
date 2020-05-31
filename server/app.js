const express = require('express');
const cors = require('cors');
const webScraper = require('./scraper/puppet');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

app.get('/deals/:searchTerm/:pageNum', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const pageNum = req.params.pageNum;
  var response = {
    results: null,
    error: false
  };
  try {
    await webScraper.scrapeResults(searchTerm, pageNum).then((results) => {
      response.results = results;
    }).catch((err) => {
      response.error = true;
    });
  } catch (err) {
    response.error = true;
  }
  res.json(response);
});


app.listen(3001, () => {});