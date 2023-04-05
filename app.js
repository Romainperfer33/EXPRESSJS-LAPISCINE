const express = require('express')
const app = express()
const port = 3000
let coworkings = require('./mock_coworking');
const morgan = require('morgan');
const servFavicon = require('serve-favicon');
const e = require('express');



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
  let newId = coworkings [coworkings.length - 1].id +1;

  newCoworking.id = newId;
  coworkings.push(newCoworking);

  const msg = 'un coworking a bien ete ajouté'
  res.json({message: msg, data: newCoworking})
})

  app.put('/api/coworkings/:id', (req,res)=> {
    let coworkingToModofy = coworkings.find(coworking => coworking.id == req.params.id)
    if (!coworkingToModofy) {
      const msg = `Le coworking n°${req.params.id} n'existe pas.`
      return res.status(404).json({message:msg})
    }
    coworkingToModofy = {...coworkingToModofy, ...req.body}
    let index = coworkings.findIndex((coworking)=>coworking.id == coworkingToModofy.id);
    coworkings[index]=coworkingToModofy;
    res.json(coworkings)
  })

  app.delete('api/coworkings/:id', (req,res)=>{
    let coworkingToDelete = coworkings.findIndex(el => el.id == req.params.id)
    if (!coworkingToDelete) {
      const msg = `Le coworking n°${req.params.id}est supprimé.`
      return res.status(404).json({message:msg})
    }
    let coworkingsUpdated = []
    coworkings.forEach((el)=>{
      if(el.id != coworkingToDelete.id) {
        coworkingsUpdated.push(el)
      }

    })
    coworkings = coworkingsUpdated;
    res.json(coworkings)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
