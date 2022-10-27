const routes =  require('./routes')

const express = require('express')
const formidable = require('express-formidable')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(formidable())

app.use(routes.routerVideo)
app.use(routes.routerTest)

app.listen(3001, () => {
  console.log('app is listening at 3001')
})
