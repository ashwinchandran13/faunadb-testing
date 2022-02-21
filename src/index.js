const app = require('express')();
require('dotenv').config();

const faunadb = require('faunadb');
const client = new faunadb.Client({ 
    secret: process.env.FAUNA_SECRET,
    domain: "db.us.fauna.com"
})


const {
    Get,
    Ref,
    Collection
} = faunadb.query;

app.listen(5000, () => console.log('API on http://localhost:5000'))

app.get('/review/:id', async (req, res) => {
    const doc = await client.query(
        Get(
            Ref(
                Collection('reviews'),
                req.params.id
            )
        )
    )

    res.send(doc)
})