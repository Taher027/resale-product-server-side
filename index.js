const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { restart } = require('nodemon');
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iitoxlh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    const userCollection = client.db('assignment').collection('users');
    const productCollection = client.db('assignment').collection('products');

    try {

        // user collection to db


        app.post('/users', async (req, res) => {
            const userInfo = req.body;
            const result = await userCollection.insertOne(userInfo);
            res.send(result);
        });
        app.delete("/deleteUser/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        app.post('/addProduct', async (req, res) => {
            const productInfo = req.body;
            console.log(productInfo);
            const result = await productCollection.insertOne(productInfo);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(err => console.log(err))

app.get('/', (req, res) => {
    console.log('test')
    res.send('api found')

})
app.listen(port, () => {
    console.log('server running')
})