const express=require('express')
const app=express()
const PORT=5000
const mongoose=require("mongoose")
const {MONGOURL}=require("./keys")

//passing the path for the mongoose file
require("./models/user")

//passing the route to the routes file
app.use(express.json())
app.use(require('./routes/auth'))

//connecting to mongoose
mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Printing on connection
mongoose.connection.on("connected",()=>{
    console.log("Connected to mongodb")
})

//On errror printing the error
mongoose.connection.on("error",()=>{
    console.log("Error !!")
})

//Run the server using command node app.js
//Access the server by visiting this through your browser http://localhost:5000/

app.get('/',(req,res)=>{
    res.send("Hello world !")
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})
app.get('/getAdministrator', (req, res)=> {
    Administrator.find({Flights:"Number", Flights:"Departure", Flights:"Arrival", Flights:"Dates", Flights:"Airport_Terminals"}).then(result =>
        res.send(result));

});
function App() {
    const[Flights, setFlights]= useState([]);
    useEffect(()=>{
      axios.get('http://localhost:8000/users/getFlight').then(res=>{
        setPeople(res.data);
  
      })
    },[]);
  
    return (
      <div className="">
        <div className="content">
            <h1>Flight Details </h1>
  
            <br/>
            
              
          {people.map((flight)=>
          
            <div className="row" key={._id}>
              <p className="left-txt"> <b>Number:</b> {flight.Number} </p>
              <p className="left-txt"> <b>DepTime:</b>{flight.Departure}: </p>
              <p className="left-txt"> <b>ArrivalTime:</b>{person.Arrival} </p>
              <p className="left-txt"> <b>Dates:</b>{person.Dates} </p>
              <p className="left-txt"> <b>Terminals:</b>{person.Terminals} </p>
            </div>
              )}
  
            
        </div>
      </div>
  
    );
  }