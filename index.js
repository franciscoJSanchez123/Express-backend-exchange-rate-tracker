/*
//lo puedo hacer de esta manera solo con el objeto app
//pero para websocket necesitaba un servidor http por eso abajo lo hice de otra
//manera 
const express=require('express');
const app=express();
const port=3000;



const price=require('./price')
app.use('/price',price)



app.get('/',(req,res)=>{
    res.json('hello francisco!!')
    console.log(req)
})

app.post('/', (req, res) =>{
    res.send('Got a POST request')
    console.log(req.params)
  })

app.listen(port, ()=>{

    console.log(`Example app listening at http://localhost:${port}`)
})
*/
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port=process.env.PORT || 3000

//------------------------------------------------------------------------------------------------
const PriceInstagram=require('./service')
const cron =require('node-cron');


cron.schedule('04 09 1-31 1-12 1-5 ',async()=>{
  const tasa=await PriceInstagram(true,false)
  console.log(tasa)
  io.emit('tasa',`${tasa}`)
},{scheduled: true,
  timezone: 'America/Caracas'});

cron.schedule('04 13 1-31 1-12 1-5 ',async()=>{
  const tasa=await PriceInstagram(false,true)
  console.log(tasa)
  io.emit('tasa',`${tasa}`)
},{scheduled: true,
  timezone: 'America/Caracas'});

//------------------------------------------------------------------------------------------------

const price=require('./price')
app.use('/price',price);

app.get('/', (req, res) => {
    res.json('hello franciso!!')
    //console.log(req)
});
//-------------------------------------------------------------------------------------------------
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('saludo',(arg)=>{     //escucho mensajes desde el cliente con el evento saludo
    console.log(arg)
  })
  socket.on('solicitarTasa',(arg)=>{     //escucho mensajes desde el cliente con el evento 

    socket.emit('ultimaTasa','algo')
  })

  socket.emit("hello", "que tal? qie pas?"); //emito mensajes hacia el cliente con el evento hello
});
//---------------------------------------------------------------------------------------------------
/*
setInterval(() => {
  
  io.emit('hora',`${new Date().toTimeString()}`);
}, 60000);*/
//---------------------------------------------------------------------------------------------------
/*
const MongoClient = require("mongodb").MongoClient

const url='mongodb+srv://Ferreservica2020:fjJrGaSA959190@cluster0.h0rkb.mongodb.net/TasaDolarParalelo?retryWrites=true&w=majority'

MongoClient.connect(url,{useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log("Error occurred connecting to MongoDB...");
  }
  
  console.log("Connected to MongoDB!");
})
*/

const mongoose = require('mongoose');

const url='mongodb+srv://Ferreservica2020:fjJrGaSA959190@cluster0.h0rkb.mongodb.net/TasaDolarParalelo?retryWrites=true&w=majority'

mongoose.connect(url,{useUnifiedTopology: true })
  .then(bd=>console.log('conexion satisfactoria'))
  .catch(error=>console.log('la conexion a la base de datos a fallado'))

//---------------------------------------------------------------------------------------------------
const baseDeDatos=mongoose.model('tasa')
const precio =baseDeDatos.findById('6179791356e3bdc0e5897079')
console.log(precio)
server.listen(port, () => {
  console.log('listening on *:3000');
});

