const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()
const { mongoClient } = require("./db");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//app.use(reqsuire("./routes/record"));
// get driver connection

mongoClient()
//get all analytics
app.get('/api/analytics', async(req, res) => {
    
  try{
      // database and collection code goes here
      const db = await mongoClient();
      const data = await db.collection("analytics").find({}).toArray() ;
     
      res.status(200).json(data)
      
  }
  catch(e){
    console.log(e)
  }
}
);
app.post('/api/analytics', async(req, res) => {
 const db= await mongoClient();
 const object2 = req.body;




  const data= db.collection("analytics").insertOne(object2)
  if(data)
    res.json("changes done")
  else
    res.json("Could not insert in analytics")

 })
 



app.listen(port, () => {
  // perform a database connection when server starts
  
  console.log(`Server is running on port: ${port}`);
});
