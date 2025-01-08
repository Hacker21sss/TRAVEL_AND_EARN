
var createError = require('http-errors');
const http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { createServer } = require("http");
const cors = require('cors');

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();


const httpServer = createServer(app);






const authRoutes=require('./user/router/Userrouter')  // Firebase configuration
const profile=require('./user/router/profileroute');
const password=require('./user/router/passwordroute');
const resetpass=require('./user/router/newpassroute');
const feedback=require('./user/router/feedbackroute');
const help=require('./user/router/helproute');
const traveldetail=require('./user/router/traveldetailsrouter');
const addressdetail=require('./user/router/recentaddressrouter');
const regionRouter = require('./user/router/regionRouter'); // Import the region router
const instructiondetail=require('./user/router/DeliveryInstructionRoute')
const location=require('./user/router/locationroute')
// const travellerrating=require('./traveller/controller/travellercontroller');

const earning=require('./traveller/router/earningroute')
// Initialize express app and load environment variables
const editprofile=require('./user/router/editprofileroute')
 const address=require('./traveller/router/addressroute')
 const map=require('./traveller/controller/mapscontroller')
 const travelt=require('./user/router/detailsroute')
dotenv.config();




app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Environment variables
const PORT = process.env.PORT || 5000;
const Mongo_URI=process.env.MONGO_URI;
console.log(`Mongo_URI: ${Mongo_URI}`);
console.log(`JWT Secret: ${process.env.JWT_SECRET}`);
console.log(`Port: ${PORT}`);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes (example: define your routes here)
// app.use('/api', yourRoutes);

// Create and start the HTTP server
const server = require('http').createServer(app);
app.use('/api/auth', authRoutes);
app.use('/api',profile,map,location,travelt)
app.use('/pass',password);
app.use('/reset',resetpass)
app.use('/app',help,earning);
app.use('/feed',feedback);
// app.use('/travel',travellerrating);
app.use('/earn',earning)
app.use('/editp',instructiondetail,editprofile)
app.use('/t',traveldetail,regionRouter);
app.use('/address',addressdetail,address);
// app.use('/available',travelleravailable)


app.use(function(req, res, next) {
  next(createError(404));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
