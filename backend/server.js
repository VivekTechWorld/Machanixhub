// const express=require('express');
// const mongoose=require('mongoose');
// const dotenv=require('dotenv');
// const cors=require('cors');

// const mechanicRoutes=require('./routes/mechanicRoutes'); 
// const vehicleOwnerRoutes=require('./routes/vehicleOwnerRoutes');
// // const serviceRoutes=require('./routes/serviceRoutes');
// const locationRoutes = require("./routes/locationRoutes");
// const MechanicProfileRoutes = require("./routes/MechanicProfileRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const { initializeSocket } = require("./socket");
// const http = require("http");

// dotenv.config();
// const app=express();


// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI,
//     {useNewUrlParser:true,
//     useUnifiedTopology:true,
//     }).then(()=>console.log("Mongodb connected "))
//     .catch((err)=>console.log(err));


// app.use('/api/mechanic',mechanicRoutes);
// app.use('/api/vehicleOwner',vehicleOwnerRoutes);
// // app.use('/api',serviceRoutes);
// app.use("/api", locationRoutes);
// app.use("/api/mechanic", MechanicProfileRoutes);
// app.use("/messages", messageRoutes);


// const server = http.createServer(app); // Define server
// initializeSocket(server);

// //server start
// const PORT=process.env.PORT || 5000;
// app.listen(PORT, () =>
//     console.log(`Server is running on http://192.168.1.100:${PORT}`)
// );



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');

const mechanicRoutes = require('./routes/mechanicRoutes'); 
const vehicleOwnerRoutes = require('./routes/vehicleOwnerRoutes');
const locationRoutes = require("./routes/locationRoutes");
const MechanicProfileRoutes = require("./routes/MechanicProfileRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
const BookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { initializeSocket } = require("./socket");

dotenv.config();
const app = express();
const server = http.createServer(app); // Define HTTP server

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// API Routes
app.use('/api/mechanic', mechanicRoutes);
app.use('/api/vehicleOwner', vehicleOwnerRoutes);
app.use("/api", locationRoutes);
app.use("/api/mechanic", MechanicProfileRoutes);
// app.use("/messages", messageRoutes); 
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/admin",adminRoutes);


// API Test Route (For Checking Server)
app.get("/", (req, res) => {
  res.send("MechanixHub Server is Running 🚀");
});


// Initialize Socket.IO
initializeSocket(server);

// Start server with WebSockets
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at: http://192.168.1.100:${PORT}`);
  console.log(`🔌 WebSocket running at: ws://192.168.1.100:${PORT}`);
});
