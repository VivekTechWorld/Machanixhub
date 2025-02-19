const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');


const mechanicRoutes=require('./routes/mechanicRoutes'); 
const vehicleOwnerRoutes=require('./routes/vehicleOwnerRoutes');

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser:true,
    useUnifiedTopology:true,
    }).then(()=>console.log("Mongodb connected "))
    .catch((err)=>console.log(err));


app.use('/api/mechanic',mechanicRoutes);
app.use('/api/vehicleOwner',vehicleOwnerRoutes);

//server start
const PORT=process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server is running on http://192.168.1.100:${PORT}`)
  );



