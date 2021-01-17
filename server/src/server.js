const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const Dev = require('./Models/devModels')
require('dotenv').config();

const app = express(); 
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


io.on('connection', socket => {
    const { user } = socket.handshake.query;
    console.log('Nova conexão, o user:'+ user + 'se conectou pelo id.socer:' + socket.id)
    async function logando() {
    const loggedDev = await Dev.findOne({_id: user})
    if(loggedDev){
        await Dev.updateOne(
            {"_id":loggedDev._id},
            {$set:{"SocketId":socket.id}
        })
         await loggedDev.save();
    }
    }
    logando();  
});

app.use((req,res,next)=>{
req.io = io;
return next();
});
 
 
mongoose.connect(`${process.env.DATABASE_URI}`, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors());
app.use(express.json());
app.use(routes)

server.listen(process.env.PORT || 3335)