const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()
const { mongoClient } = require("./conn");
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
app.post('/api/analytics/:object', async(req, res) => {
 const db= await mongoClient();
 const object2 = JSON.parse(req.params.object);




  const data= db.collection("analytics").insertOne({object2})

  res.json("changes done")

 })
 



app.listen(port, () => {
  // perform a database connection when server starts
  
  console.log(`Server is running on port: ${port}`);
});
