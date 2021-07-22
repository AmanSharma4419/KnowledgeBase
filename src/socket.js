const debug = require('debug')('app:socket');
const express = require('express');
const http = require("http");
const mongoose = require('mongoose');
const { messages, models,enums } = require('./constants/index');
var io = require('socket.io')(http);
const webScan = mongoose.model(models.WEBSCAN);

module.exports.init = (server) => {
    console.log("socket connection");
    io = require('socket.io')(server, {
        origins: '*:*',
        cookie: false,
        handlePreflightRequest: async (req, res) => {
            const headers = {
             'Access-Control-Allow-Headers': [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                    'Authorization',
                    'Accept-Language'
                ].join(', '),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
                'Access-Control-Allow-Credentials': false,
            };
            res.writeHead(200, headers);
            res.end();
        },
    })
     io.on('connection', (socket) => {
        console.log("inside ")
        socket.on('disconnect', async function(){
            console.log("device "+socket.roomID+" disconnected");
            if(socket.roomID){
                io.to(`room-${socket.roomID}`).emit('onDisconnect');
                await webScan.update({sts:'D'}, {where: {"token": socket.roomID}})
            }
        });
        socket.on('joinRoom', function(id){
            console.log("id",id);
            console.log("join the room Server: ",id.room)
            socket.join(`room-${id.room}`)
            io.sockets.in(`room-${id.room}`).emit('connectToRoom', "You are in room no. "+id.room);
            socket.roomID = id.room
        });
    });
}

module.exports.sendToken = (id,random_string) => {
   console.log("id",id,"random_string :: ",random_string);
   io.to(`room-${id}`).emit('token_verified', random_string);
}


