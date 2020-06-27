const jwt = require('jsonwebtoken')

const SECRET_KEY_FOR_TOKEN = "lgknslkfhlksnfdlk"
const EXPIRE_DATE_OF_TOKEN = "7 days"

const generateToken = (userID) => {
    const token = jwt.sign(
        {
            _id: userID
        },
        SECRET_KEY_FOR_TOKEN,
        {
            expiresIn: EXPIRE_DATE_OF_TOKEN
        })

    // console.log(token)
    return token
}

const verifyToken = (token) => {
    const data = jwt.verify(token, SECRET_KEY_FOR_TOKEN)

    // console.log(data)
    return data
}

module.exports = {
    verifyToken,
    generateToken,
}
