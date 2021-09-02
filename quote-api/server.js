const express = require('express');
const morgan = require('morgan');
const app = express();
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
const PORT = process.env.PORT || 4001;

//start server
app.listen(PORT, () => {
  console.log(`${PORT}`)
})

app.use(express.static('public'));

//get a random quote
app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send( {quote: randomQuote} );
});

//get all quotes
app.get('/api/quotes', (req, res, next) => {
  const requestPerson = req.query.person;
  const fQ = quotes.filter(auth => auth.person === requestPerson);
  if(requestPerson) {
    res.send({ quotes: fQ });
  } else {
    res.send({ quotes: quotes });
  }
}); 

//post. add a new quote

app.post('/api/quotes', (req, res, next) => {
  const nQ = req.query.quote;
  const nP = req.query.person;
  const addQ = { quote: nQ, person: nP }; 

  if(nQ !== '' && nP !== '') {
    quotes.push(addQ);
    res.send({ quote: addQ });
  } else {
    res.status(400).send();
  }
});

