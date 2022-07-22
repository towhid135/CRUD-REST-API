const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

/*It will convert the json data to javascript object from the request body
for all routes. If we don't use  any specific routes to  app.use then it will be used
for all routes */
app.use(express.json());
//console.log('dot env value',process.env.DB_CONNECT);

//connect db
mongoose.connect(process.env.DB_CONNECT,{
    useUnifiedTopology:true,useNewUrlParser: true
},
() => {console.log('connected to mongoDB')}
)

//import routes
const productRoutes = require("./routes/products");

//routes middlewares
app.use("/api/products",productRoutes);

app.listen(4000, () => {console.log('Server Running on Port 4000')});