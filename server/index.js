const express = require('express')

const app = express()
const port = 5000

app.get('/', (_, res) => res.send('Server up!'))

app.listen(port, () => console.log(`Server listening to http://localhost:${port}`))
