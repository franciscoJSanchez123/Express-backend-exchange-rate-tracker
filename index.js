
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port=process.env.PORT || 3000

//------------------------------------------------------------------------------------------------



const mongoose = require('mongoose');
const url='url'
   mongoose.connect(url,{useUnifiedTopology: true })
  .then(bd=>console.log('conexion satisfactoria'))
  .catch(error=>console.log('la conexion a la base de datos a fallado'))

  const baseDeDatos=  mongoose.model('tasa',new mongoose.Schema({ tasa: Number,fecha:String,hora:String  }, {versionKey: false}),'tasa')



//------------------------------------------------------------------------------------------------
const PriceInstagram=require('./service')
const cron =require('node-cron');


cron.schedule('04 09 1-31 1-12 1-5 ',async()=>{
  const tasa=await PriceInstagram(true,false)
  const newTasa=await new baseDeDatos(tasa)
  const tasa2=await newTasa.save()
  io.emit('tasa',`${tasa}`)
},{scheduled: true,
  timezone: 'America/Caracas'});

cron.schedule('05 17 1-31 1-12 1-5 ',async()=>{

  
  const tasa=await PriceInstagram(false,true)
  const newTasa=await new baseDeDatos(tasa)
  const tasa2=await newTasa.save()
  io.emit('tasa',`${tasa}`)
},{scheduled: true,
  timezone: 'America/Caracas'});

//------------------------------------------------------------------------------------------------

const price=require('./price');
app.use('/price',price);

app.get('/', (req, res) => {
    res.json('hello francisco!!')
   
});
//-------------------------------------------------------------------------------------------------
io.on('connection', (socket) => {
 

  
  socket.on('solicitarTasa',async(arg)=>{     //escucho mensajes desde el cliente con el evento 
   
    
    const tasa=await baseDeDatos.find().sort({$natural:-1}).limit(1)//solicito el ultimo dato guardado pero como es una matriz con 1 elememto le mando el elemento [0]
    socket.emit('ultimaTasa',tasa[0])
  })


});
//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------

server.listen(port, () => {
  console.log('listening on *:3000');
});

