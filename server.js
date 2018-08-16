const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('Hello world from a Node.js app!')
})
app.listen(port, () => {
    console.log('Server is up on 3000')
})