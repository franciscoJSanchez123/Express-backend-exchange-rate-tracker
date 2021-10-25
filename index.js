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


cron.schedule('09 04 1-31 1-12 1-5 ',async()=>{
  const tasa=await PriceInstagram(true,false)
  console.log(tasa)
  io.emit('tasa',`${tasa}`)
});

cron.schedule('13 04 1-31 1-12 1-5 ',async()=>{
  const tasa=await PriceInstagram(false,true)
  console.log(tasa)
  io.emit('tasa',`${tasa}`)
});

//------------------------------------------------------------------------------------------------

const price=require('./price')
app.use('/price',price);

app.get('/', (req, res) => {
    res.json('hello franciso!!')
    //console.log(req)
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('saludo',(arg)=>{     //escucho mensajes desde el cliente con el evento saludo
    console.log(arg)
  })

  socket.emit("hello", "que tal? qie pas?"); //emito mensajes hacia el cliente con el evento hello
});

server.listen(port, () => {
  console.log('listening on *:3000');
});
