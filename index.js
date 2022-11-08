const express = require('express')
const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config();
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.ce7hihf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const travelEgencyCollection = client.db("jet-set-go-travel-server").collection("services")
        app.get('/services',async(req,res)=>{
            const query = {}
            const cursor = travelEgencyCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        })
    }finally{

    }
}
run().catch(error=>console.error(error))
app.get('/',(req,res)=>{
    res.send('jet set go travel agency server side is ready')
})

app.listen(port,()=>{
    console.log(`the port is running on${port}`)
})