const express = require('express')
const socketio = require('socket.io')
const path = require('path')
const http = require('http')

const app = express()

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname , "public")))
app.set("view engine" , 'ejs')
app.set("views" , path.resolve("./views"))



io.on("connection" , function(socket){
    socket.on("send-location" , function(data){
        io.emit("recieve-location" , {id : socket.id , ...data});
    })
    socket.on("disconnect" , function(){
        io.emit("disconnected" , socket.id);
    })
    console.log("connected");
})



app.get("/" , function(req ,res){
    res.render("home");
})

server.listen(3000)