const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const storageRouter = require('./storage/storage')
const sellerRouter = require('./dashboard/router/seller.js')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(sellerRouter)
app.use(storageRouter)

app.use((err, req, res, next) => {
    if(err.code === "INCORRECT_FILETYPE"){
        res.status(422).send("Only jpeg, jpg, png images are allowed.")
    }
    else if(err.code === "LIMIT_FILE_SIZE"){
        res.status(422).send("Image size must be less than 10MB")
    }

    next()
})

app.listen(port, () => {
    console.log(chalk.keyword('green')('Server is up on port ' + port))
})
