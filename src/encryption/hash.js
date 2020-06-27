const bcrypt = require('bcryptjs')
const NO_OF_ITERATION = 8

const encrypt = async (text) => {
    return await bcrypt.hash(text, NO_OF_ITERATION)
}

const match = async (comparedText, hashedText) => {
    return await bcrypt.compare(comparedText, hashedText)
}

module.exports = {
    encrypt,
    match
}
