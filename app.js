const express = require('express')
const app = express()
const port = 3000
const coworkings = require('./mock_coworking');
const morgan = require('morgan');
const servFavicon = require('serve-favicon');



// const logger = (req,res,next) => {
//   console.log(`URL : ${req.url}`)
//   next();
// }

app
  .use(morgan('dev'))
  .use(servFavicon(__dirname + '/favicon.ico'))
  .use(express.json())


app.get('/api/coworkings', (req, res) => {
    const limit = req.query.limit || 200
    const result = coworkings.filter(e => e.superficy>limit);
    const mesg = `La liste des coworkings a bien ete retournée`
  res.send({message: mesg, data: result})
})

app.get('/api/coworking/:id', (req, res) => {
    let myCoworking = coworkings.find((coworking) => { return coworking.id === Number (req.params.id)})

    let result = {}
    if (myCoworking){
      const msg = `Le coworking n°${req.params.id} a bien ete trouve`
      result = { message: msg, data: myCoworking }

    } else {
      const msg = `Aucun Coworking ne correspond à l'identifiant ${req.params.id}`
      result = { message: msg, data:{}}
    }
  
    res.send({result})
  })

  app.post('/api/coworkings', (req, res) => {
  let newCoworking = req.body;
  coworkings.push(newCoworking);
  res.json(coworkings)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
