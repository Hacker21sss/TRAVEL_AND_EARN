const socketio=require('socket.io');
const express = require('express');
const http = require('http');
const user=require('./user/model/Profile');

let io;

function initializationsocket(server){
    io= socket.io(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
    }
});
io.on('connection',(socket)=>{
    console.log(`a new client connected:${socket.id}`);
})
socket.on('join',async(data)=>{
const {userId,userType}=data;
if(userType==='user'){
    await user.findByIdAndUpdate(userId,{socketId:socket.id});
}
else if(userType==='Traveller'){
    await traveler.findByIdAndUpdate(userId,{socketId:socketId});
}
})


}

module.exports={initializationsocket};