const express=require("express");
const app=express();
const {chats}=require("./Data/data");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const userRoutes=require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const messageRoutes = require('./routes/messageRoutes')
const cors = require('cors');
const path = require('path');
connectDB();
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/message', messageRoutes)


const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1, "/frontend/dist")));

    app.use((req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"));
});
}else{
    app.get("/", (req,res) =>{
        res.send("API is running successfully");
    });
}



app.use(notFound);
app.use(errorHandler); 

const PORT=process.env.PORT || 3000; 


const server=app.listen(PORT,console.log("app is listening to port:"+PORT));

const io= require('socket.io')(server,{
    pingTimeout: 600000,
   cors:{  origin: "http://localhost:5173",
    methods: ["GET", "POST"]
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id);
      
        socket.emit("connected");
    })

    socket.on("join chat", (room)=>{
        socket.join(room);
        
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on('new message', (newMessageRecived) =>{
        var chat = newMessageRecived.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user=>{
            if(user._id == newMessageRecived.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecived)
        })
    })

    socket.off("setup", ()=>{
        console.log("User Disconnected");
        socket.leave(userData._id);
    })
})